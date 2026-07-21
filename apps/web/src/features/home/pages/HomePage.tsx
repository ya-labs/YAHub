import { AboutSection } from '../sections/AboutSection';
import { BuildFlowSection } from '../sections/BuildFlowSection';
import { EcosystemSection } from '../sections/EcosystemSection';
import { HeroSection } from '../sections/HeroSection';
import { ProductsSection } from '../sections/ProductsSection';
import { YahubCentralSection } from '../sections/YahubCentralSection';
import { HomeShell } from '../layouts/HomeShell';

export function HomePage() {
    return (
        <HomeShell>
            <HeroSection />
            <AboutSection />
            <EcosystemSection />
            <BuildFlowSection />
            <ProductsSection />
            <YahubCentralSection />
        </HomeShell>
    );
}
