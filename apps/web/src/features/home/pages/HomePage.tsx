import { HomeShell } from "../layouts/HomeShell";
import { HeroSection } from "../sections/HeroSection";
import { AboutSection } from "../sections/AboutSection";
import { ProjectsPreviewSection } from "../sections/ProjectsPreviewSection";
import { MembersPreviewSection } from "../sections/MembersPreviewSection";
import { ContactSection } from "../sections/ContactSection";

export function HomePage() {
    return (
        <HomeShell>
            <HeroSection/>
            <AboutSection/>
            <ProjectsPreviewSection/>
            <MembersPreviewSection/>
            <ContactSection/>
        </HomeShell>
    )
}
