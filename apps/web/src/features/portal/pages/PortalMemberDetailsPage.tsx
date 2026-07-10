import { useParams } from "react-router-dom";

export function PortalMembersDetailsPage() {
    const { slug } = useParams();

    return (
        <section>
            <h1>Membro: {slug}</h1>
            <p>Detalhes públicos do membro em construção.</p>
        </section>
    )
}