import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import type { MemberDetails, MemberPayload, OrganizationLink, ProjectDetails } from '../../../shared/api/contracts';
import { yahubApi } from '../../../shared/api/yahubApi';
import { DataState } from '../../../shared/components/DataState';
import type { AsyncDataState } from '../../../shared/hooks/useAsyncData';

type MemberFormState = {
    slug: string;
    name: string;
    role: string;
    githubUsername: string;
    responsibilities: string;
    projectSlugs: string;
    bio: string;
    links: OrganizationLink[];
};

type MemberDraft = { editingMemberId: string | null; formState: MemberFormState };
type MemberValidationErrors = Partial<Record<'name' | 'role' | 'githubUsername', string>>;

const memberDraftStorageKey = 'yahub.admin.members.draft';
const initialFormState: MemberFormState = {
    slug: '',
    name: '',
    role: '',
    githubUsername: '',
    responsibilities: '',
    projectSlugs: '',
    bio: '',
    links: [],
};

const responsibilitySuggestions = ['Front-end', 'Back-end', 'UX', 'Produto', 'Documentação', 'Infraestrutura'];

function canUseSessionStorage() {
    return typeof window !== 'undefined' && typeof window.sessionStorage !== 'undefined';
}

function readMemberDraft(): MemberDraft | null {
    if (!canUseSessionStorage()) return null;
    const storedDraft = window.sessionStorage.getItem(memberDraftStorageKey);
    if (!storedDraft) return null;

    try {
        return JSON.parse(storedDraft) as MemberDraft;
    } catch {
        window.sessionStorage.removeItem(memberDraftStorageKey);
        return null;
    }
}

function splitList(value: string) {
    return value
        .split(',')
        .map((item) => item.trim())
        .filter(Boolean);
}

function nullableText(value: string) {
    return value.trim() || null;
}

function createSlug(value: string) {
    return value
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
}

type MultiSelectFieldProps = {
    id: string;
    label: string;
    value: string;
    options: Array<{ value: string; label: string }>;
    onChange: (value: string) => void;
    allowCustom?: boolean;
};

function MultiSelectField({ id, label, value, options, onChange, allowCustom = false }: MultiSelectFieldProps) {
    const [customValue, setCustomValue] = useState('');
    const selectedValues = splitList(value);
    const availableOptions = options.filter((option) => !selectedValues.includes(option.value));

    function addValue(nextValue: string) {
        const normalizedValue = nextValue.trim();
        if (!normalizedValue || selectedValues.includes(normalizedValue)) return;
        onChange([...selectedValues, normalizedValue].join(', '));
        setCustomValue('');
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
            {allowCustom ? (
                <div className="admin-multi-select__custom">
                    <input
                        aria-label={`Nova opção para ${label}`}
                        type="text"
                        value={customValue}
                        onChange={(event) => setCustomValue(event.target.value)}
                        onKeyDown={(event) => {
                            if (event.key === 'Enter') {
                                event.preventDefault();
                                addValue(customValue);
                            }
                        }}
                        placeholder="Adicionar opção"
                    />
                    <button type="button" onClick={() => addValue(customValue)} disabled={!customValue.trim()}>
                        Adicionar
                    </button>
                </div>
            ) : null}
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

type ExternalLinksFieldProps = {
    value: OrganizationLink[];
    onChange: (links: OrganizationLink[]) => void;
};

function ExternalLinksField({ value, onChange }: ExternalLinksFieldProps) {
    const [label, setLabel] = useState('');
    const [url, setUrl] = useState('');

    function addLink() {
        const normalizedLabel = label.trim();
        const normalizedUrl = url.trim();
        if (!normalizedLabel || !normalizedUrl || value.some((link) => link.url === normalizedUrl)) return;
        onChange([...value, { label: normalizedLabel, url: normalizedUrl }]);
        setLabel('');
        setUrl('');
    }

    return (
        <div className="admin-multi-select">
            <span>Links externos</span>
            <span className="admin-field-help">Opcional. Adicione outros perfis ou referências do membro.</span>
            <select
                aria-label="Tipo de link externo"
                value=""
                onChange={(event) => setLabel(event.target.value)}
            >
                <option value="">Usar tipo padrão</option>
                <option value="Spotifolio">Spotifolio</option>
            </select>
            <div className="admin-external-links__entry">
                <input
                    aria-label="Nome do link externo"
                    type="text"
                    value={label}
                    onChange={(event) => setLabel(event.target.value)}
                    placeholder="Ex.: GitHub"
                />
                <input
                    aria-label="URL do link externo"
                    type="url"
                    value={url}
                    onChange={(event) => setUrl(event.target.value)}
                    placeholder="https://exemplo.com/perfil"
                />
                <button type="button" onClick={addLink} disabled={!label.trim() || !url.trim()}>
                    Adicionar link
                </button>
            </div>
            <div className="admin-selected-values" aria-live="polite">
                {value.length ? (
                    value.map((link) => (
                        <span className="admin-selected-value" key={`${link.label}-${link.url}`}>
                            {link.label}: {link.url}
                            <button
                                type="button"
                                aria-label={`Remover ${link.label}`}
                                onClick={() => onChange(value.filter((item) => item.url !== link.url))}
                            >
                                ×
                            </button>
                        </span>
                    ))
                ) : (
                    <span className="admin-field-help">Nenhum link adicionado.</span>
                )}
            </div>
        </div>
    );
}

function createFormStateFromMember(member: MemberDetails): MemberFormState {
    return {
        slug: member.slug,
        name: member.name,
        role: member.role,
        githubUsername: member.githubUsername ?? '',
        responsibilities: member.responsibilities.join(', '),
        projectSlugs: member.projectSlugs.join(', '),
        bio: member.bio ?? '',
        links: member.links,
    };
}

function createPayloadFromForm(formState: MemberFormState): MemberPayload {
    return {
        slug: createSlug(formState.name),
        name: formState.name.trim(),
        role: formState.role.trim(),
        githubUsername: nullableText(formState.githubUsername),
        spotifolioUsername: null,
        responsibilities: splitList(formState.responsibilities),
        projectSlugs: splitList(formState.projectSlugs),
        bio: nullableText(formState.bio),
        links: formState.links,
    };
}

function validateMemberForm(formState: MemberFormState): MemberValidationErrors {
    const errors: MemberValidationErrors = {};
    if (!formState.name.trim()) errors.name = 'Informe o nome do membro.';
    if (!formState.role.trim()) errors.role = 'Informe o cargo do membro.';
    if (!formState.githubUsername.trim()) errors.githubUsername = 'Informe o usuário do GitHub.';
    return errors;
}

function hasEditableMemberDraft(draft: MemberDraft | null, memberId: string) {
    return Boolean(draft?.editingMemberId === memberId && draft.formState.name.trim());
}

export function AdminMemberFormPage() {
    const { memberId } = useParams();
    const navigate = useNavigate();
    const isEditing = Boolean(memberId);
    const [formState, setFormState] = useState<MemberFormState>(() => {
        const draft = readMemberDraft();
        return !isEditing && draft?.editingMemberId === null ? draft.formState : initialFormState;
    });
    const [pageState, setPageState] = useState<AsyncDataState<boolean>>({
        data: isEditing ? null : true,
        error: null,
        isLoading: isEditing,
    });
    const [loadedMemberId, setLoadedMemberId] = useState<string | null>(isEditing ? null : 'new');
    const [formError, setFormError] = useState<string | null>(null);
    const [validationErrors, setValidationErrors] = useState<MemberValidationErrors>({});
    const [isSaving, setIsSaving] = useState(false);
    const [projects, setProjects] = useState<ProjectDetails[]>([]);

    useEffect(() => {
        if (!isEditing || !memberId) return;
        let isActive = true;
        const draft = readMemberDraft();

        void yahubApi.admin.members
            .list()
            .then((members) => {
                if (!isActive) return;
                const member = members.find((item) => item.id === memberId);
                if (!member) {
                    setPageState({ data: null, error: 'Membro não encontrado.', isLoading: false });
                    return;
                }
                setFormState(
                    draft && hasEditableMemberDraft(draft, memberId)
                        ? draft.formState
                        : createFormStateFromMember(member),
                );
                setPageState({ data: true, error: null, isLoading: false });
                setLoadedMemberId(memberId);
            })
            .catch((error: unknown) => {
                if (isActive)
                    setPageState({
                        data: null,
                        error: error instanceof Error ? error.message : 'Não foi possível carregar o membro.',
                        isLoading: false,
                    });
            });

        return () => {
            isActive = false;
        };
    }, [isEditing, memberId]);

    useEffect(() => {
        let isActive = true;
        void yahubApi.admin.projects.list().then((projectData) => {
            if (isActive) setProjects(projectData);
        });

        return () => {
            isActive = false;
        };
    }, []);

    useEffect(() => {
        if (!canUseSessionStorage() || (isEditing && loadedMemberId !== memberId)) return;
        window.sessionStorage.setItem(
            memberDraftStorageKey,
            JSON.stringify({ editingMemberId: memberId ?? null, formState }),
        );
    }, [formState, isEditing, loadedMemberId, memberId]);

    function updateForm<Value extends keyof MemberFormState>(field: Value, value: MemberFormState[Value]) {
        setFormState((currentState) => ({ ...currentState, [field]: value }));
        setValidationErrors((currentErrors) => {
            if (!(field in currentErrors)) return currentErrors;
            const nextErrors = { ...currentErrors };
            delete nextErrors[field as keyof MemberValidationErrors];
            return nextErrors;
        });
    }

    function updateExternalLinks(links: OrganizationLink[]) {
        setFormState((currentState) => ({ ...currentState, links }));
    }

    function discardDraft() {
        window.sessionStorage.removeItem(memberDraftStorageKey);
        navigate('/admin/membros');
    }

    const projectOptions = projects.map((project) => ({ value: project.slug, label: project.displayName }));
    const responsibilityOptions = responsibilitySuggestions.map((responsibility) => ({
        value: responsibility,
        label: responsibility,
    }));
    async function handleSubmit(event: { preventDefault: () => void }) {
        event.preventDefault();
        setFormError(null);
        const nextValidationErrors = validateMemberForm(formState);
        setValidationErrors(nextValidationErrors);
        if (Object.keys(nextValidationErrors).length) return;

        setIsSaving(true);

        try {
            const payload = createPayloadFromForm(formState);
            if (isEditing && memberId) await yahubApi.admin.members.update(memberId, payload);
            else await yahubApi.admin.members.create(payload);
            window.sessionStorage.removeItem(memberDraftStorageKey);
            navigate('/admin/membros', {
                state: { feedback: `Membro ${payload.name} ${isEditing ? 'atualizado' : 'criado'} localmente.` },
            });
        } catch (error: unknown) {
            setFormError(error instanceof Error ? error.message : 'Não foi possível salvar o membro.');
        } finally {
            setIsSaving(false);
        }
    }

    return (
        <main className="admin-page">
            <section className="admin-page__header">
                <div>
                    <p className="portal-kicker">Administração</p>
                    <h1>{isEditing ? 'Editar membro' : 'Novo membro'}</h1>
                    <p>Preencha os dados administrativos. O rascunho é preservado nesta sessão enquanto você navega.</p>
                </div>
                <Link className="admin-link-action" to="/admin/membros">
                    <span>Voltar para membros</span>
                    <span aria-hidden="true">←</span>
                </Link>
            </section>

            <DataState {...pageState} emptyMessage="">
                {() => (
                    <section className="admin-form-section">
                        <p className="portal-section__note">
                            Selecione projetos e links relacionados. Responsabilidades podem ser escolhidas ou criadas
                            conforme a necessidade.
                        </p>
                        {formError ? <p className="admin-feedback admin-feedback--error" role="alert">{formError}</p> : null}
                        <form className="admin-form" onSubmit={handleSubmit} aria-busy={isSaving}>
                            <label>
                                <span className="admin-field-label admin-field-label--required">Nome</span>
                                <input
                                    type="text"
                                    value={formState.name}
                                    onChange={(event) => updateForm('name', event.target.value)}
                                    aria-required="true"
                                    aria-invalid={Boolean(validationErrors.name) || undefined}
                                    aria-describedby={validationErrors.name ? 'member-name-error' : undefined}
                                />
                                {validationErrors.name ? <span id="member-name-error" className="admin-field-error">{validationErrors.name}</span> : null}
                            </label>
                            <label>
                                <span className="admin-field-label admin-field-label--required">Cargo</span>
                                <input
                                    type="text"
                                    value={formState.role}
                                    onChange={(event) => updateForm('role', event.target.value)}
                                    aria-required="true"
                                    aria-invalid={Boolean(validationErrors.role) || undefined}
                                    aria-describedby={validationErrors.role ? 'member-role-error' : undefined}
                                />
                                {validationErrors.role ? <span id="member-role-error" className="admin-field-error">{validationErrors.role}</span> : null}
                            </label>
                            <label>
                                <span className="admin-field-label admin-field-label--required">Usuário do GitHub</span>
                                <input
                                    type="text"
                                    value={formState.githubUsername}
                                    onChange={(event) => updateForm('githubUsername', event.target.value)}
                                    placeholder="nicolasmacardoso"
                                    aria-required="true"
                                    aria-invalid={Boolean(validationErrors.githubUsername) || undefined}
                                    aria-describedby={validationErrors.githubUsername ? 'member-github-username-error' : undefined}
                                />
                                {validationErrors.githubUsername ? (
                                    <span id="member-github-username-error" className="admin-field-error">
                                        {validationErrors.githubUsername}
                                    </span>
                                ) : null}
                            </label>
                            <MultiSelectField
                                id="member-responsibilities"
                                label="Responsabilidades"
                                value={formState.responsibilities}
                                options={responsibilityOptions}
                                onChange={(value) => updateForm('responsibilities', value)}
                                allowCustom
                            />
                            <MultiSelectField
                                id="member-projects"
                                label="Projetos associados"
                                value={formState.projectSlugs}
                                options={projectOptions}
                                onChange={(value) => updateForm('projectSlugs', value)}
                            />
                            <label>
                                Biografia
                                <textarea
                                    value={formState.bio}
                                    onChange={(event) => updateForm('bio', event.target.value)}
                                />
                            </label>
                            <ExternalLinksField value={formState.links} onChange={updateExternalLinks} />
                            <div className="admin-form__actions">
                                <button type="submit" className="portal-button" disabled={isSaving}>
                                    {isSaving ? 'Salvando...' : isEditing ? 'Salvar alterações' : 'Criar membro'}
                                </button>
                                <Link className="admin-link-action" to="/admin/membros">
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
