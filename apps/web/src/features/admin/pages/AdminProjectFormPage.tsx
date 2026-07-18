import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import type {
    GithubRepository,
    MemberDetails,
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

type ProjectDraft = { editingProjectId: string | null; formState: ProjectFormState };

const projectDraftStorageKey = 'yahub.admin.projects.draft';
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

const categoryLabels: Record<ProjectCategory, string> = { produto: 'Produto', ecossistema: 'Ecossistema' };
const affiliationLabels: Record<ProjectAffiliation, string> = { oficial: 'Oficial', orientado: 'Orientado' };
const statusLabels: Record<ProjectStatus, string> = {
    ideia: 'Ideia',
    planejamento: 'Planejamento',
    desenvolvimento: 'Desenvolvimento',
    ativo: 'Ativo',
    pausado: 'Pausado',
    arquivado: 'Arquivado',
};
const visibilityLabels: Record<ProjectVisibility, string> = { publico: 'Público', oculto: 'Oculto' };
const technologyOptions = ['React', 'TypeScript', 'JavaScript', 'Node.js', 'Spring Boot', 'Java', 'GitHub', 'Markdown'];
const supportTypeLabels: Record<ProjectSupportType, string> = {
    apoio_tecnico: 'Apoio técnico',
    documentacao: 'Documentação',
    revisao: 'Revisão',
    divulgacao: 'Divulgação',
    mentoria: 'Mentoria',
};

type MultiSelectFieldProps = {
    id: string;
    label: string;
    value: string;
    options: Array<{ value: string; label: string }>;
    onChange: (value: string) => void;
    helpText?: string;
};

function splitList(value: string) {
    return value
        .split(',')
        .map((item) => item.trim())
        .filter(Boolean);
}

function MultiSelectField({ id, label, value, options, onChange, helpText }: MultiSelectFieldProps) {
    const selectedValues = splitList(value);
    const availableOptions = options.filter((option) => !selectedValues.includes(option.value));

    function addValue(nextValue: string) {
        if (!nextValue) return;
        onChange([...selectedValues, nextValue].join(', '));
    }

    function removeValue(valueToRemove: string) {
        onChange(selectedValues.filter((item) => item !== valueToRemove).join(', '));
    }

    return (
        <div className="admin-multi-select">
            <label htmlFor={id}>{label}</label>
            <select id={id} value="" onChange={(event) => addValue(event.target.value)}>
                <option value="">Selecionar opção</option>
                {availableOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
            {helpText ? <span className="admin-field-help">{helpText}</span> : null}
            <div className="admin-selected-values" aria-live="polite">
                {selectedValues.length ? (
                    selectedValues.map((selectedValue) => {
                        const option = options.find((item) => item.value === selectedValue);
                        const selectedLabel = option?.label ?? selectedValue;
                        return (
                            <span className="admin-selected-value" key={selectedValue}>
                                {selectedLabel}
                                <button
                                    type="button"
                                    aria-label={`Remover ${selectedLabel}`}
                                    onClick={() => removeValue(selectedValue)}
                                >
                                    ×
                                </button>
                            </span>
                        );
                    })
                ) : (
                    <span className="admin-field-help">Nenhuma opção selecionada.</span>
                )}
            </div>
        </div>
    );
}
function nullableText(value: string) {
    const normalizedValue = value.trim();
    return normalizedValue || null;
}
function canUseSessionStorage() {
    return typeof window !== 'undefined' && typeof window.sessionStorage !== 'undefined';
}

function readProjectDraft(): ProjectDraft | null {
    if (!canUseSessionStorage()) return null;
    const storedDraft = window.sessionStorage.getItem(projectDraftStorageKey);
    if (!storedDraft) return null;
    try {
        return JSON.parse(storedDraft) as ProjectDraft;
    } catch {
        window.sessionStorage.removeItem(projectDraftStorageKey);
        return null;
    }
}

function hasEditableProjectDraft(draft: ProjectDraft | null, projectId: string) {
    return Boolean(
        draft?.editingProjectId === projectId && draft.formState.displayName.trim() && draft.formState.slug.trim(),
    );
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
        technologies: project.technologies.join(', '),
        displayOrder: String(project.displayOrder),
        featured: project.featured,
        authorDisplayName: project.authorDisplayName ?? '',
        supportTypes: (project.supportTypes ?? []).join(', '),
        yalabsMentorIds: project.yalabsMentorIds.join(', '),
        responsibleMemberIds: project.responsibleMemberIds.join(', '),
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

export function AdminProjectFormPage() {
    const { projectId } = useParams();
    const navigate = useNavigate();
    const isEditing = Boolean(projectId);
    const [formState, setFormState] = useState<ProjectFormState>(() => {
        const draft = readProjectDraft();
        return !isEditing && draft?.editingProjectId === null ? draft.formState : initialFormState;
    });
    const [pageState, setPageState] = useState<AsyncDataState<boolean>>({
        data: isEditing ? null : true,
        error: null,
        isLoading: isEditing,
    });
    const [loadedProjectId, setLoadedProjectId] = useState<string | null>(isEditing ? null : 'new');
    const [formError, setFormError] = useState<string | null>(null);
    const [isSaving, setIsSaving] = useState(false);
    const [repositories, setRepositories] = useState<GithubRepository[]>([]);
    const [members, setMembers] = useState<MemberDetails[]>([]);
    const [selectedRepository, setSelectedRepository] = useState<GithubRepository | null>(null);
    const [repositoryUrlInput, setRepositoryUrlInput] = useState('');
    const [isResolvingRepository, setIsResolvingRepository] = useState(false);

    useEffect(() => {
        if (!isEditing || !projectId) return;
        let isActive = true;
        const draft = readProjectDraft();

        void yahubApi.admin.projects
            .list()
            .then((projects) => {
                if (!isActive) return;
                const project = projects.find((item) => item.id === projectId);
                if (!project) {
                    setPageState({ data: null, error: 'Projeto não encontrado.', isLoading: false });
                    return;
                }
                setFormState(
                    draft && hasEditableProjectDraft(draft, projectId)
                        ? draft.formState
                        : createFormStateFromProject(project),
                );
                setSelectedRepository({
                    githubRepositoryId: project.githubRepositoryId,
                    githubOwner: project.githubOwner,
                    githubName: project.githubName,
                    repositoryUrl: project.repositoryUrl,
                    primaryLanguage: project.primaryLanguage,
                    description: null,
                    topics: [],
                    alreadyRegistered: false,
                });
                setPageState({ data: true, error: null, isLoading: false });
                setLoadedProjectId(projectId);
            })
            .catch((error: unknown) => {
                if (isActive)
                    setPageState({
                        data: null,
                        error: error instanceof Error ? error.message : 'Não foi possível carregar o projeto.',
                        isLoading: false,
                    });
            });

        return () => {
            isActive = false;
        };
    }, [isEditing, projectId]);

    useEffect(() => {
        let isActive = true;

        void Promise.all([yahubApi.admin.githubRepositories.list(), yahubApi.admin.members.list()])
            .then(([repositoryData, memberData]) => {
                if (!isActive) return;
                setRepositories(repositoryData);
                setMembers(memberData);
            })
            .catch((error: unknown) => {
                if (isActive)
                    setFormError(
                        error instanceof Error
                            ? error.message
                            : 'Não foi possível carregar as opções administrativas mockadas.',
                    );
            });

        return () => {
            isActive = false;
        };
    }, []);

    useEffect(() => {
        if (!canUseSessionStorage() || (isEditing && loadedProjectId !== projectId)) return;
        window.sessionStorage.setItem(
            projectDraftStorageKey,
            JSON.stringify({ editingProjectId: projectId ?? null, formState }),
        );
    }, [formState, isEditing, loadedProjectId, projectId]);

    function updateForm<Value extends keyof ProjectFormState>(field: Value, value: ProjectFormState[Value]) {
        setFormState((currentState) => ({ ...currentState, [field]: value }));
    }

    function applyRepository(repository: GithubRepository) {
        setSelectedRepository(repository);
        setRepositoryUrlInput(repository.repositoryUrl);
        setFormState((currentState) => ({
            ...currentState,
            githubRepositoryId: repository.githubRepositoryId,
            githubOwner: repository.githubOwner,
            githubName: repository.githubName,
            repositoryUrl: repository.repositoryUrl,
            primaryLanguage: repository.primaryLanguage ?? '',
        }));
    }

    async function resolveRepositoryUrl() {
        if (!repositoryUrlInput.trim()) return;
        setFormError(null);
        setIsResolvingRepository(true);

        try {
            applyRepository(await yahubApi.admin.githubRepositories.resolve({ repositoryUrl: repositoryUrlInput }));
        } catch (error: unknown) {
            setFormError(error instanceof Error ? error.message : 'Não foi possível resolver o repositório informado.');
        } finally {
            setIsResolvingRepository(false);
        }
    }

    function discardDraft() {
        window.sessionStorage.removeItem(projectDraftStorageKey);
        navigate('/admin/projetos');
    }

    async function handleSubmit(event: { preventDefault: () => void }) {
        event.preventDefault();
        setFormError(null);
        setIsSaving(true);
        try {
            const payload = createPayloadFromForm(formState);
            if (isEditing && projectId) await yahubApi.admin.projects.update(projectId, payload);
            else await yahubApi.admin.projects.create(payload);
            window.sessionStorage.removeItem(projectDraftStorageKey);
            navigate('/admin/projetos', {
                state: {
                    feedback: `Projeto ${payload.displayName} ${isEditing ? 'atualizado' : 'criado'} localmente.`,
                },
            });
        } catch (error: unknown) {
            setFormError(error instanceof Error ? error.message : 'Não foi possível salvar o projeto.');
        } finally {
            setIsSaving(false);
        }
    }

    const memberOptions = members.map((member) => ({ value: member.id, label: member.name }));
    const repositoryDetails =
        selectedRepository ??
        (formState.githubRepositoryId
            ? {
                  githubRepositoryId: formState.githubRepositoryId,
                  githubOwner: formState.githubOwner,
                  githubName: formState.githubName,
                  repositoryUrl: formState.repositoryUrl,
                  primaryLanguage: nullableText(formState.primaryLanguage),
                  description: null,
                  topics: [],
                  alreadyRegistered: false,
              }
            : null);

    return (
        <main className="admin-page">
            <section className="admin-page__header">
                <div>
                    <p className="portal-kicker">Administração</p>
                    <h1>{isEditing ? 'Editar projeto' : 'Novo projeto'}</h1>
                    <p>
                        Preencha as informações administrativas. O rascunho é preservado nesta sessão enquanto você
                        navega.
                    </p>
                </div>
                <Link className="admin-link-action" to="/admin/projetos">
                    <span>Voltar para projetos</span>
                    <span aria-hidden="true">←</span>
                </Link>
            </section>

            <DataState {...pageState} emptyMessage="">
                {() => (
                    <section className="admin-form-section">
                        <p className="portal-section__note">
                            Os dados de repositório exibidos abaixo são simulados. Nenhuma consulta ao GitHub é feita
                            nesta versão.
                        </p>
                        {formError ? <p role="alert">{formError}</p> : null}
                        <form className="admin-form" onSubmit={handleSubmit}>
                            {!isEditing ? (
                                <fieldset className="admin-form__full-width admin-repository-picker">
                                    <legend>Repositório de origem</legend>
                                    <p className="admin-field-help">
                                        Selecione um repositório mockado da YA LABS ou informe uma URL para simular a
                                        busca.
                                    </p>
                                    <div className="admin-repository-picker__cards">
                                        {repositories.map((repository) => (
                                            <button
                                                className="admin-repository-card"
                                                type="button"
                                                key={repository.githubRepositoryId}
                                                disabled={repository.alreadyRegistered}
                                                onClick={() => applyRepository(repository)}
                                            >
                                                <span>{repository.githubName}</span>
                                                <small>{repository.description ?? 'Sem descrição mockada.'}</small>
                                                <small>
                                                    {repository.alreadyRegistered
                                                        ? 'Projeto já cadastrado'
                                                        : repository.primaryLanguage ?? 'Sem linguagem principal'}
                                                </small>
                                            </button>
                                        ))}
                                    </div>
                                    <div className="admin-repository-picker__url">
                                        <label htmlFor="repository-url-input">URL de outro repositório</label>
                                        <input
                                            id="repository-url-input"
                                            type="url"
                                            value={repositoryUrlInput}
                                            onChange={(event) => setRepositoryUrlInput(event.target.value)}
                                            placeholder="https://github.com/ya-labs/repositorio"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => void resolveRepositoryUrl()}
                                            disabled={!repositoryUrlInput.trim() || isResolvingRepository}
                                        >
                                            {isResolvingRepository ? 'Carregando...' : 'Usar URL mockada'}
                                        </button>
                                    </div>
                                </fieldset>
                            ) : null}

                            <section className="admin-form__full-width admin-repository-details" aria-live="polite">
                                <div>
                                    <p className="portal-kicker">Dados simulados do GitHub</p>
                                    <h2>Informações do repositório</h2>
                                </div>
                                {repositoryDetails ? (
                                    <dl>
                                        <div>
                                            <dt>Repositório</dt>
                                            <dd>{repositoryDetails.githubOwner}/{repositoryDetails.githubName}</dd>
                                        </div>
                                        <div>
                                            <dt>URL</dt>
                                            <dd>{repositoryDetails.repositoryUrl}</dd>
                                        </div>
                                        <div>
                                            <dt>Linguagem principal</dt>
                                            <dd>{repositoryDetails.primaryLanguage ?? 'Não informada'}</dd>
                                        </div>
                                        <div>
                                            <dt>Tópicos</dt>
                                            <dd>{repositoryDetails.topics.length ? repositoryDetails.topics.join(', ') : 'Não informados'}</dd>
                                        </div>
                                        <div>
                                            <dt>Descrição</dt>
                                            <dd>{repositoryDetails.description ?? 'Não informada'}</dd>
                                        </div>
                                    </dl>
                                ) : (
                                    <p className="admin-field-help">Selecione um repositório para carregar os dados simulados.</p>
                                )}
                            </section>

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
                            <MultiSelectField
                                id="project-technologies"
                                label="Tecnologias"
                                value={formState.technologies}
                                options={technologyOptions.map((technology) => ({ value: technology, label: technology }))}
                                onChange={(value) => updateForm('technologies', value)}
                                helpText="Selecione todas as tecnologias relevantes ao projeto."
                            />
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
                            <MultiSelectField
                                id="project-support-types"
                                label="Tipos de apoio"
                                value={formState.supportTypes}
                                options={Object.entries(supportTypeLabels).map(([value, label]) => ({ value, label }))}
                                onChange={(value) => updateForm('supportTypes', value)}
                            />
                            <MultiSelectField
                                id="project-mentors"
                                label="Mentores YA LABS"
                                value={formState.yalabsMentorIds}
                                options={memberOptions}
                                onChange={(value) => updateForm('yalabsMentorIds', value)}
                            />
                            <MultiSelectField
                                id="project-responsible-members"
                                label="Responsáveis"
                                value={formState.responsibleMemberIds}
                                options={memberOptions}
                                onChange={(value) => updateForm('responsibleMemberIds', value)}
                            />
                            <label className="admin-form__checkbox">
                                <input
                                    type="checkbox"
                                    checked={formState.featured}
                                    onChange={(event) => updateForm('featured', event.target.checked)}
                                />
                                Exibir em destaque
                            </label>
                            <div className="admin-form__actions">
                                <button type="submit" className="portal-button" disabled={isSaving}>
                                    {isSaving ? 'Salvando...' : isEditing ? 'Salvar alterações' : 'Criar projeto'}
                                </button>
                                <Link className="admin-link-action" to="/admin/projetos">
                                    <span>Voltar e manter rascunho</span>
                                    <span aria-hidden="true">←</span>
                                </Link>
                                <button type="button" onClick={discardDraft}>
                                    Descartar rascunho
                                </button>
                            </div>
                        </form>
                    </section>
                )}
            </DataState>
        </main>
    );
}
