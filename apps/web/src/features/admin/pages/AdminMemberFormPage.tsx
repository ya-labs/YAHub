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
    spotifolioUsername: string;
    responsibilities: string;
    projectSlugs: string;
    bio: string;
    links: string;
};

type MemberDraft = { editingMemberId: string | null; formState: MemberFormState };

const memberDraftStorageKey = 'yahub.admin.members.draft';
const initialFormState: MemberFormState = {
    slug: '',
    name: '',
    role: '',
    githubUsername: '',
    spotifolioUsername: '',
    responsibilities: '',
    projectSlugs: '',
    bio: '',
    links: '',
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

function createLinks(formState: MemberFormState): OrganizationLink[] {
    return splitList(formState.links).flatMap((linkType) => {
        if (linkType === 'github' && formState.githubUsername.trim()) {
            return [{ label: 'GitHub', url: `https://github.com/${formState.githubUsername.trim()}` }];
        }
        if (linkType === 'spotifolio' && formState.spotifolioUsername.trim()) {
            return [{ label: 'Spotifolio', url: `https://spotifolio.com/${formState.spotifolioUsername.trim()}` }];
        }
        return [];
    });
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

function createFormStateFromMember(member: MemberDetails): MemberFormState {
    return {
        slug: member.slug,
        name: member.name,
        role: member.role,
        githubUsername: member.githubUsername ?? '',
        spotifolioUsername: member.spotifolioUsername ?? '',
        responsibilities: member.responsibilities.join(', '),
        projectSlugs: member.projectSlugs.join(', '),
        bio: member.bio ?? '',
        links: member.links
            .map((link) => (link.label.toLowerCase() === 'github' ? 'github' : link.label.toLowerCase() === 'spotifolio' ? 'spotifolio' : ''))
            .filter(Boolean)
            .join(', '),
    };
}

function createPayloadFromForm(formState: MemberFormState): MemberPayload {
    return {
        slug: createSlug(formState.name),
        name: formState.name.trim(),
        role: formState.role.trim(),
        githubUsername: nullableText(formState.githubUsername),
        spotifolioUsername: nullableText(formState.spotifolioUsername),
        responsibilities: splitList(formState.responsibilities),
        projectSlugs: splitList(formState.projectSlugs),
        bio: nullableText(formState.bio),
        links: createLinks(formState),
    };
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
    const linkOptions = [
        { value: 'github', label: 'GitHub' },
        { value: 'spotifolio', label: 'Spotifolio' },
    ];

    async function handleSubmit(event: { preventDefault: () => void }) {
        event.preventDefault();
        setFormError(null);
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
                        {formError ? <p role="alert">{formError}</p> : null}
                        <form className="admin-form" onSubmit={handleSubmit}>
                            <label>
                                Nome
                                <input
                                    type="text"
                                    value={formState.name}
                                    onChange={(event) => updateForm('name', event.target.value)}
                                    required
                                />
                            </label>
                            <label>
                                Função
                                <input
                                    type="text"
                                    value={formState.role}
                                    onChange={(event) => updateForm('role', event.target.value)}
                                    required
                                />
                            </label>
                            <label>
                                Usuário do GitHub
                                <input
                                    type="text"
                                    value={formState.githubUsername}
                                    onChange={(event) => updateForm('githubUsername', event.target.value)}
                                    placeholder="nicolasmacardoso"
                                />
                            </label>
                            <label>
                                Usuário do Spotifolio
                                <input
                                    type="text"
                                    value={formState.spotifolioUsername}
                                    onChange={(event) => updateForm('spotifolioUsername', event.target.value)}
                                />
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
                            <MultiSelectField
                                id="member-links"
                                label="Links externos"
                                value={formState.links}
                                options={linkOptions}
                                onChange={(value) => updateForm('links', value)}
                            />
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
