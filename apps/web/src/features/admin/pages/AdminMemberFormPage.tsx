import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import type { MemberDetails, MemberPayload, OrganizationLink } from '../../../shared/api/contracts';
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

function joinLinks(links: OrganizationLink[]) {
    return links.map((link) => `${link.label} | ${link.url}`).join('\n');
}

function parseLinks(value: string): OrganizationLink[] {
    return value
        .split('\n')
        .map((line) => line.trim())
        .filter(Boolean)
        .map((line) => {
            const [label, ...urlParts] = line.split('|');
            const url = urlParts.join('|').trim();

            if (!label?.trim() || !url) throw new Error('Cada link deve seguir o formato "Nome | https://url".');
            return { label: label.trim(), url };
        });
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
        links: joinLinks(member.links),
    };
}

function createPayloadFromForm(formState: MemberFormState): MemberPayload {
    return {
        slug: formState.slug.trim(),
        name: formState.name.trim(),
        role: formState.role.trim(),
        githubUsername: nullableText(formState.githubUsername),
        spotifolioUsername: nullableText(formState.spotifolioUsername),
        responsibilities: splitList(formState.responsibilities),
        projectSlugs: splitList(formState.projectSlugs),
        bio: nullableText(formState.bio),
        links: parseLinks(formState.links),
    };
}

function hasEditableMemberDraft(draft: MemberDraft | null, memberId: string) {
    return Boolean(draft?.editingMemberId === memberId && draft.formState.name.trim() && draft.formState.slug.trim());
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
                            Use vírgulas para responsabilidades e projetos. Informe um link externo por linha no formato
                            “Nome | https://url”.
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
                                Slug
                                <input
                                    type="text"
                                    value={formState.slug}
                                    onChange={(event) => updateForm('slug', event.target.value)}
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
                            <label>
                                Responsabilidades
                                <input
                                    type="text"
                                    value={formState.responsibilities}
                                    onChange={(event) => updateForm('responsibilities', event.target.value)}
                                    placeholder="Front-end, UX"
                                />
                            </label>
                            <label>
                                Projetos associados
                                <input
                                    type="text"
                                    value={formState.projectSlugs}
                                    onChange={(event) => updateForm('projectSlugs', event.target.value)}
                                    placeholder="yahub, cade-o-dano"
                                />
                            </label>
                            <label>
                                Biografia
                                <textarea
                                    value={formState.bio}
                                    onChange={(event) => updateForm('bio', event.target.value)}
                                />
                            </label>
                            <label>
                                Links externos
                                <textarea
                                    value={formState.links}
                                    onChange={(event) => updateForm('links', event.target.value)}
                                    placeholder="GitHub | https://github.com/usuario"
                                />
                            </label>
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
