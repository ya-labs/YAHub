import { useCallback, useEffect, useMemo, useState } from 'react';
import type {
    ProjectAffiliation,
    ProjectCategory,
    ProjectDetails,
    ProjectPayload,
    ProjectStatus,
    ProjectSupportType,
    ProjectVisibility,
} from '../../../shared/api/contracts';
import { yahubApi } from '../../../shared/api/yahubApi';
import { DataState } from '../../../shared/components/DataState';
import type { AsyncDataState } from '../../../shared/hooks/useAsyncData';

type ProjectFormState = {
    slug: string;
    displayName: string;
    tagline: string;
    category: ProjectCategory;
    affiliation: ProjectAffiliation;
    shortDescription: string;
    fullDescription: string;
    status: ProjectStatus;
    visibility: ProjectVisibility;
    primaryLanguage: string;
    repositoryUrl: string;
    githubOwner: string;
    githubName: string;
    githubRepositoryId: string;
    websiteUrl: string;
    documentationUrl: string;
    technologies: string;
    displayOrder: string;
    featured: boolean;
    authorDisplayName: string;
    supportTypes: string;
    yalabsMentorIds: string;
    responsibleMemberIds: string;
};

type ProjectDraft = {
    editingProjectId: string | null;
    formState: ProjectFormState;
};

const projectDraftStorageKey = 'yahub.admin.projects.draft';

const categoryLabels: Record<ProjectCategory, string> = {
    produto: 'Produto',
    ecossistema: 'Ecossistema',
};

const affiliationLabels: Record<ProjectAffiliation, string> = {
    oficial: 'Oficial',
    orientado: 'Orientado',
};

const statusLabels: Record<ProjectStatus, string> = {
    ideia: 'Ideia',
    planejamento: 'Planejamento',
    desenvolvimento: 'Desenvolvimento',
    ativo: 'Ativo',
    pausado: 'Pausado',
    arquivado: 'Arquivado',
};

const visibilityLabels: Record<ProjectVisibility, string> = {
    publico: 'Público',
    oculto: 'Oculto',
};

const initialFormState: ProjectFormState = {
    slug: '',
    displayName: '',
    tagline: '',
    category: 'produto',
    affiliation: 'oficial',
    shortDescription: '',
    fullDescription: '',
    status: 'planejamento',
    visibility: 'publico',
    primaryLanguage: '',
    repositoryUrl: '',
    githubOwner: '',
    githubName: '',
    githubRepositoryId: '',
    websiteUrl: '',
    documentationUrl: '',
    technologies: '',
    displayOrder: '1',
    featured: false,
    authorDisplayName: '',
    supportTypes: '',
    yalabsMentorIds: '',
    responsibleMemberIds: '',
};

function canUseSessionStorage() {
    return typeof window !== 'undefined' && typeof window.sessionStorage !== 'undefined';
}

function readProjectDraft(): ProjectDraft | null {
    if (!canUseSessionStorage()) {
        return null;
    }

    const storedDraft = window.sessionStorage.getItem(projectDraftStorageKey);

    if (!storedDraft) {
        return null;
    }

    try {
        const draft = JSON.parse(storedDraft) as ProjectDraft;

        if (!draft.formState) {
            return null;
        }

        return draft;
    } catch {
        window.sessionStorage.removeItem(projectDraftStorageKey);
        return null;
    }
}

function saveProjectDraft(draft: ProjectDraft) {
    if (canUseSessionStorage()) {
        window.sessionStorage.setItem(projectDraftStorageKey, JSON.stringify(draft));
    }
}

function clearProjectDraft() {
    if (canUseSessionStorage()) {
        window.sessionStorage.removeItem(projectDraftStorageKey);
    }
}

function splitList(value: string) {
    return value
        .split(',')
        .map((item) => item.trim())
        .filter(Boolean);
}

function joinList(value: string[]) {
    return value.join(', ');
}

function nullableText(value: string) {
    const normalizedValue = value.trim();

    return normalizedValue.length > 0 ? normalizedValue : null;
}

function createFormStateFromProject(project: ProjectDetails): ProjectFormState {
    return {
        slug: project.slug,
        displayName: project.displayName,
        tagline: project.tagline,
        category: project.category,
        affiliation: project.affiliation,
        shortDescription: project.shortDescription,
        fullDescription: project.fullDescription,
        status: project.status,
        visibility: project.visibility,
        primaryLanguage: project.primaryLanguage ?? '',
        repositoryUrl: project.repositoryUrl,
        githubOwner: project.githubOwner,
        githubName: project.githubName,
        githubRepositoryId: project.githubRepositoryId,
        websiteUrl: project.websiteUrl ?? '',
        documentationUrl: project.documentationUrl ?? '',
        technologies: joinList(project.technologies),
        displayOrder: String(project.displayOrder),
        featured: project.featured,
        authorDisplayName: project.authorDisplayName ?? '',
        supportTypes: joinList(project.supportTypes ?? []),
        yalabsMentorIds: joinList(project.yalabsMentorIds),
        responsibleMemberIds: joinList(project.responsibleMemberIds),
    };
}

function createPayloadFromForm(formState: ProjectFormState): ProjectPayload {
    return {
        slug: formState.slug.trim(),
        githubRepositoryId: formState.githubRepositoryId.trim(),
        githubOwner: formState.githubOwner.trim(),
        githubName: formState.githubName.trim(),
        displayName: formState.displayName.trim(),
        tagline: formState.tagline.trim(),
        category: formState.category,
        affiliation: formState.affiliation,
        shortDescription: formState.shortDescription.trim(),
        fullDescription: formState.fullDescription.trim(),
        status: formState.status,
        visibility: formState.visibility,
        primaryLanguage: nullableText(formState.primaryLanguage),
        repositoryUrl: formState.repositoryUrl.trim(),
        websiteUrl: nullableText(formState.websiteUrl),
        documentationUrl: nullableText(formState.documentationUrl),
        technologies: splitList(formState.technologies),
        updatedAt: new Date().toISOString(),
        featured: formState.featured,
        displayOrder: Number(formState.displayOrder) || 1,
        yalabsMentorIds: splitList(formState.yalabsMentorIds),
        responsibleMemberIds: splitList(formState.responsibleMemberIds),
        authorDisplayName: nullableText(formState.authorDisplayName),
        supportTypes: splitList(formState.supportTypes) as ProjectSupportType[],
    };
}

export function AdminProjectsPage() {
    const [projectsState, setProjectsState] = useState<AsyncDataState<ProjectDetails[]>>({
        data: null,
        error: null,
        isLoading: true,
    });
    const [formState, setFormState] = useState<ProjectFormState>(initialFormState);
    const [editingProjectId, setEditingProjectId] = useState<string | null>(null);
    const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
    const [feedback, setFeedback] = useState<string | null>(null);
    const [formError, setFormError] = useState<string | null>(null);
    const projects = useMemo(() => projectsState.data ?? [], [projectsState.data]);
    const isEditing = editingProjectId !== null;

    const orderedProjects = useMemo(
        () =>
            [...projects].sort(
                (firstProject, secondProject) => firstProject.displayOrder - secondProject.displayOrder,
            ),
        [projects],
    );

    const loadProjects = useCallback(async (options: { showLoading: boolean }) => {
        if (options.showLoading) {
            setProjectsState((currentState) => ({
                ...currentState,
                error: null,
                isLoading: true,
            }));
        }

        try {
            const data = await yahubApi.admin.projects.list();
            setProjectsState({ data, error: null, isLoading: false });
        } catch (error: unknown) {
            setProjectsState({
                data: null,
                error: error instanceof Error ? error.message : 'Não foi possível carregar os projetos.',
                isLoading: false,
            });
        }
    }, []);

    useEffect(() => {
        let isActive = true;

        yahubApi.admin.projects
            .list()
            .then((data) => {
                if (isActive) {
                    setProjectsState({ data, error: null, isLoading: false });
                }
            })
            .catch((error: unknown) => {
                if (isActive) {
                    setProjectsState({
                        data: null,
                        error: error instanceof Error ? error.message : 'Não foi possível carregar os projetos.',
                        isLoading: false,
                    });
                }
            });

        return () => {
            isActive = false;
        };
    }, []);

    useEffect(() => {
        if (!isProjectModalOpen) {
            return;
        }

        saveProjectDraft({
            editingProjectId,
            formState,
        });
    }, [editingProjectId, formState, isProjectModalOpen]);

    function updateForm<Value extends keyof ProjectFormState>(field: Value, value: ProjectFormState[Value]) {
        setFormState((currentState) => ({
            ...currentState,
            [field]: value,
        }));
    }

    function startCreate() {
        const draft = readProjectDraft();
        setEditingProjectId(draft?.editingProjectId ?? null);
        setFormState(draft?.formState ?? initialFormState);
        setIsProjectModalOpen(true);
        setFormError(null);
        setFeedback(draft ? 'Rascunho recuperado da sessão.' : 'Preencha os dados para criar um projeto mockado local.');
    }

    function startEdit(project: ProjectDetails) {
        const draft = readProjectDraft();
        const shouldRestoreDraft = draft?.editingProjectId === project.id;

        setEditingProjectId(project.id);
        setFormState(shouldRestoreDraft ? draft.formState : createFormStateFromProject(project));
        setIsProjectModalOpen(true);
        setFormError(null);
        setFeedback(shouldRestoreDraft ? 'Rascunho recuperado da sessão.' : `Editando ${project.displayName}.`);
    }

    function closeProjectModal() {
        setIsProjectModalOpen(false);
        setFormError(null);
        setFeedback('Modal fechado. Rascunho mantido nesta sessão.');
    }

    function discardProjectDraft() {
        clearProjectDraft();
        setEditingProjectId(null);
        setFormState(initialFormState);
        setIsProjectModalOpen(false);
        setFormError(null);
        setFeedback('Rascunho descartado.');
    }

    async function handleSubmit(event: { preventDefault: () => void }) {
        event.preventDefault();
        setFormError(null);

        try {
            const payload = createPayloadFromForm(formState);

            if (isEditing) {
                await yahubApi.admin.projects.update(editingProjectId, payload);
                setFeedback(`Projeto ${payload.displayName} atualizado localmente.`);
            } else {
                await yahubApi.admin.projects.create(payload);
                setFeedback(`Projeto ${payload.displayName} criado localmente.`);
            }

            clearProjectDraft();
            setEditingProjectId(null);
            setFormState(initialFormState);
            setIsProjectModalOpen(false);
            await loadProjects({ showLoading: true });
        } catch (error: unknown) {
            setFormError(error instanceof Error ? error.message : 'Não foi possível salvar o projeto.');
        }
    }

    async function handleRemove(project: ProjectDetails) {
        setFormError(null);

        try {
            await yahubApi.admin.projects.remove(project.id);
            setFeedback(`Projeto ${project.displayName} removido localmente.`);
            await loadProjects({ showLoading: true });
        } catch (error: unknown) {
            setFormError(error instanceof Error ? error.message : 'Não foi possível remover o projeto.');
        }
    }

    return (
        <main className="admin-page">
            <section className="admin-page__header">
                <div>
                    <p className="portal-kicker">Administração</p>
                    <h1>Projetos</h1>
                    <p>
                        Gerencie os projetos exibidos no portal público da YA LABS, com dados mockados alinhados aos
                        contratos administrativos da V1.
                    </p>
                </div>

                <button type="button" className="portal-button" onClick={startCreate}>
                    Novo projeto
                </button>
            </section>

            {feedback ? <p className="admin-feedback">{feedback}</p> : null}
            {formError ? <p role="alert">{formError}</p> : null}

            {isProjectModalOpen ? (
                <div className="admin-modal" role="presentation">
                    <section
                        className="admin-modal__panel"
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="project-form-title"
                    >
                        <div className="portal-section__header">
                            <div>
                                <p className="portal-kicker">Fluxo local</p>
                                <h2 id="project-form-title">{isEditing ? 'Editar projeto' : 'Criar projeto'}</h2>
                            </div>

                            <button type="button" className="admin-modal__close" onClick={closeProjectModal}>
                                Fechar
                            </button>
                        </div>

                        <p className="portal-section__note">
                            O rascunho é salvo nesta sessão enquanto o modal estiver aberto. Fechar mantém os dados;
                            salvar ou descartar limpa o rascunho.
                        </p>

                        <form className="admin-form" onSubmit={handleSubmit}>
                            <label>
                                Nome de exibição
                                <input
                                    type="text"
                                    value={formState.displayName}
                                    onChange={(event) => updateForm('displayName', event.target.value)}
                                    required
                                />
                            </label>

                            <label>
                                Slug
                                <input
                                    type="text"
                                    value={formState.slug}
                                    onChange={(event) => updateForm('slug', event.target.value)}
                                    required
                                />
                            </label>

                            <label>
                                Chamada curta
                                <input
                                    type="text"
                                    value={formState.tagline}
                                    onChange={(event) => updateForm('tagline', event.target.value)}
                                    required
                                />
                            </label>

                            <label>
                                Descrição curta
                                <textarea
                                    value={formState.shortDescription}
                                    onChange={(event) => updateForm('shortDescription', event.target.value)}
                                    required
                                />
                            </label>

                            <label>
                                Descrição completa
                                <textarea
                                    value={formState.fullDescription}
                                    onChange={(event) => updateForm('fullDescription', event.target.value)}
                                    required
                                />
                            </label>

                            <label>
                                Categoria
                                <select
                                    value={formState.category}
                                    onChange={(event) => updateForm('category', event.target.value as ProjectCategory)}
                                >
                                    {Object.entries(categoryLabels).map(([value, label]) => (
                                        <option key={value} value={value}>
                                            {label}
                                        </option>
                                    ))}
                                </select>
                            </label>

                            <label>
                                Vínculo
                                <select
                                    value={formState.affiliation}
                                    onChange={(event) =>
                                        updateForm('affiliation', event.target.value as ProjectAffiliation)
                                    }
                                >
                                    {Object.entries(affiliationLabels).map(([value, label]) => (
                                        <option key={value} value={value}>
                                            {label}
                                        </option>
                                    ))}
                                </select>
                            </label>

                            <label>
                                Status
                                <select
                                    value={formState.status}
                                    onChange={(event) => updateForm('status', event.target.value as ProjectStatus)}
                                >
                                    {Object.entries(statusLabels).map(([value, label]) => (
                                        <option key={value} value={value}>
                                            {label}
                                        </option>
                                    ))}
                                </select>
                            </label>

                            <label>
                                Visibilidade
                                <select
                                    value={formState.visibility}
                                    onChange={(event) =>
                                        updateForm('visibility', event.target.value as ProjectVisibility)
                                    }
                                >
                                    {Object.entries(visibilityLabels).map(([value, label]) => (
                                        <option key={value} value={value}>
                                            {label}
                                        </option>
                                    ))}
                                </select>
                            </label>

                            <label>
                                Linguagem principal
                                <input
                                    type="text"
                                    value={formState.primaryLanguage}
                                    onChange={(event) => updateForm('primaryLanguage', event.target.value)}
                                />
                            </label>

                            <label>
                                URL do repositório
                                <input
                                    type="url"
                                    value={formState.repositoryUrl}
                                    onChange={(event) => updateForm('repositoryUrl', event.target.value)}
                                    required
                                />
                            </label>

                            <label>
                                Dono no GitHub
                                <input
                                    type="text"
                                    value={formState.githubOwner}
                                    onChange={(event) => updateForm('githubOwner', event.target.value)}
                                    required
                                />
                            </label>

                            <label>
                                Nome do repositório
                                <input
                                    type="text"
                                    value={formState.githubName}
                                    onChange={(event) => updateForm('githubName', event.target.value)}
                                    required
                                />
                            </label>

                            <label>
                                ID do repositório GitHub
                                <input
                                    type="text"
                                    value={formState.githubRepositoryId}
                                    onChange={(event) => updateForm('githubRepositoryId', event.target.value)}
                                    required
                                />
                            </label>

                            <label>
                                URL do site
                                <input
                                    type="url"
                                    value={formState.websiteUrl}
                                    onChange={(event) => updateForm('websiteUrl', event.target.value)}
                                />
                            </label>

                            <label>
                                URL da documentação
                                <input
                                    type="url"
                                    value={formState.documentationUrl}
                                    onChange={(event) => updateForm('documentationUrl', event.target.value)}
                                />
                            </label>

                            <label>
                                Tecnologias
                                <input
                                    type="text"
                                    value={formState.technologies}
                                    onChange={(event) => updateForm('technologies', event.target.value)}
                                    placeholder="React, TypeScript"
                                />
                            </label>

                            <label>
                                Ordem
                                <input
                                    type="number"
                                    min="1"
                                    value={formState.displayOrder}
                                    onChange={(event) => updateForm('displayOrder', event.target.value)}
                                    required
                                />
                            </label>

                            <label>
                                Autor externo
                                <input
                                    type="text"
                                    value={formState.authorDisplayName}
                                    onChange={(event) => updateForm('authorDisplayName', event.target.value)}
                                />
                            </label>

                            <label>
                                Tipos de apoio
                                <input
                                    type="text"
                                    value={formState.supportTypes}
                                    onChange={(event) => updateForm('supportTypes', event.target.value)}
                                    placeholder="mentoria, documentacao"
                                />
                            </label>

                            <label>
                                Mentores YA LABS
                                <input
                                    type="text"
                                    value={formState.yalabsMentorIds}
                                    onChange={(event) => updateForm('yalabsMentorIds', event.target.value)}
                                    placeholder="nicolas"
                                />
                            </label>

                            <label>
                                Responsáveis
                                <input
                                    type="text"
                                    value={formState.responsibleMemberIds}
                                    onChange={(event) => updateForm('responsibleMemberIds', event.target.value)}
                                    placeholder="nicolas, caio"
                                />
                            </label>

                            <label className="admin-form__checkbox">
                                <input
                                    type="checkbox"
                                    checked={formState.featured}
                                    onChange={(event) => updateForm('featured', event.target.checked)}
                                />
                                Exibir em destaque
                            </label>

                            <div className="admin-form__actions">
                                <button type="submit" className="portal-button">
                                    {isEditing ? 'Salvar alterações' : 'Criar projeto'}
                                </button>
                                <button type="button" onClick={closeProjectModal}>
                                    Fechar e manter
                                </button>
                                <button type="button" onClick={discardProjectDraft}>
                                    Descartar rascunho
                                </button>
                            </div>
                        </form>
                    </section>
                </div>
            ) : null}

            <DataState {...projectsState} emptyMessage="Nenhum projeto cadastrado.">
                {() => (
                    <section className="admin-page__content">
                        <section className="admin-dashboard__stats" aria-label="Resumo administrativo de projetos">
                            <article className="portal-stat">
                                <strong>{projects.length}</strong>
                                <span>Projetos cadastrados</span>
                            </article>

                            <article className="portal-stat">
                                <strong>{projects.filter((project) => project.visibility === 'publico').length}</strong>
                                <span>Visíveis no portal</span>
                            </article>

                            <article className="portal-stat">
                                <strong>{projects.filter((project) => project.featured).length}</strong>
                                <span>Em destaque</span>
                            </article>

                            <article className="portal-stat">
                                <strong>
                                    {projects.filter((project) => project.documentationUrl === null).length}
                                </strong>
                                <span>Sem documentação</span>
                            </article>
                        </section>

                        <ul className="admin-list" aria-label="Projetos administrativos">
                            {orderedProjects.map((project) => (
                                <li className="admin-list__item" key={project.id}>
                                    <article>
                                        <header className="admin-list__header">
                                            <div>
                                                <p className="portal-kicker">{categoryLabels[project.category]}</p>
                                                <h2>{project.displayName}</h2>
                                            </div>

                                            <span className="admin-list__badge">{statusLabels[project.status]}</span>
                                        </header>

                                        <p>{project.shortDescription}</p>

                                        <dl className="admin-list__details">
                                            <div>
                                                <dt>Vínculo</dt>
                                                <dd>{affiliationLabels[project.affiliation]}</dd>
                                            </div>
                                            <div>
                                                <dt>Visibilidade</dt>
                                                <dd>{visibilityLabels[project.visibility]}</dd>
                                            </div>
                                            <div>
                                                <dt>Linguagem</dt>
                                                <dd>{project.primaryLanguage ?? 'Não informada'}</dd>
                                            </div>
                                            <div>
                                                <dt>Ordem</dt>
                                                <dd>{project.displayOrder}</dd>
                                            </div>
                                            <div>
                                                <dt>Repositório</dt>
                                                <dd>
                                                    <a href={project.repositoryUrl} target="_blank" rel="noreferrer">
                                                        {project.githubOwner}/{project.githubName}
                                                    </a>
                                                </dd>
                                            </div>
                                            <div>
                                                <dt>Documentação</dt>
                                                <dd>
                                                    {project.documentationUrl ? (
                                                        <a
                                                            href={project.documentationUrl}
                                                            target="_blank"
                                                            rel="noreferrer"
                                                        >
                                                            Abrir documentação
                                                        </a>
                                                    ) : (
                                                        'Pendente'
                                                    )}
                                                </dd>
                                            </div>
                                        </dl>

                                        <footer className="admin-list__footer">
                                            <span>{project.featured ? 'Exibido em destaque' : 'Sem destaque'}</span>

                                            <div
                                                className="admin-list__actions"
                                                aria-label={`Ações de ${project.displayName}`}
                                            >
                                                <button type="button" onClick={() => startEdit(project)}>
                                                    Editar
                                                </button>
                                                <button type="button" onClick={() => void handleRemove(project)}>
                                                    Remover
                                                </button>
                                            </div>
                                        </footer>
                                    </article>
                                </li>
                            ))}
                        </ul>
                    </section>
                )}
            </DataState>
        </main>
    );
}
