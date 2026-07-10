import { AboutSection } from '../sections/AboutSection';
import { ContactSection } from '../sections/ContactSection';
import { HeroSection } from '../sections/HeroSection';
import { MembersPreviewSection } from '../sections/MembersPreviewSection';
import { ProjectsPreviewSection } from '../sections/ProjectsPreviewSection';
import { HomeShell } from '../layouts/HomeShell';

export function HomePage() {
    return (
        <HomeShell>
            <h1>Home do YAHub</h1>
            <HeroSection/>
            <AboutSection/>
            <ProjectsPreviewSection/>
            <MembersPreviewSection/>
            <ContactSection/>
        </HomeShell>
    );
}
