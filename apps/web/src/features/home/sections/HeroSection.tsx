import type { PointerEvent as ReactPointerEvent } from 'react';

import yaLabsLogo from '../../../assets/marca-horizontal-fina.svg';

export function HeroSection() {
    const updatePointerPosition = (event: ReactPointerEvent<HTMLElement>) => {
        if (event.pointerType === 'touch' || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            return;
        }

        const bounds = event.currentTarget.getBoundingClientRect();
        const x = (event.clientX - bounds.left) / bounds.width;
        const y = (event.clientY - bounds.top) / bounds.height;

        event.currentTarget.style.setProperty('--hero-shift-x', `${((x - 0.5) * -14).toFixed(2)}px`);
        event.currentTarget.style.setProperty('--hero-shift-y', `${((y - 0.5) * -10).toFixed(2)}px`);
        event.currentTarget.style.setProperty('--hero-orbit-x', `${((x - 0.5) * 8).toFixed(2)}px`);
        event.currentTarget.style.setProperty('--hero-orbit-y', `${((y - 0.5) * 6).toFixed(2)}px`);
        event.currentTarget.style.setProperty('--hero-content-x', `${((x - 0.5) * 5).toFixed(2)}px`);
        event.currentTarget.style.setProperty('--hero-content-y', `${((y - 0.5) * 3).toFixed(2)}px`);
    };

    const resetPointerPosition = (event: ReactPointerEvent<HTMLElement>) => {
        event.currentTarget.style.setProperty('--hero-shift-x', '0px');
        event.currentTarget.style.setProperty('--hero-shift-y', '0px');
        event.currentTarget.style.setProperty('--hero-orbit-x', '0px');
        event.currentTarget.style.setProperty('--hero-orbit-y', '0px');
        event.currentTarget.style.setProperty('--hero-content-x', '0px');
        event.currentTarget.style.setProperty('--hero-content-y', '0px');
    };

    return (
        <section
            className="home-hero"
            id="home"
            aria-labelledby="home-title"
            onPointerMove={updatePointerPosition}
            onPointerLeave={resetPointerPosition}
        >
            <div className="home-hero__scene" aria-hidden="true">
                <span className="home-hero__material" />
                <span className="home-hero__grid" />
                <div className="home-hero__orbit-field">
                    <span className="home-hero__orbit home-hero__orbit--one" />
                    <span className="home-hero__orbit home-hero__orbit--two" />
                    <span className="home-hero__orbit home-hero__orbit--three" />
                    <span className="home-hero__orbit home-hero__orbit--four" />
                    <span className="home-hero__orbit home-hero__orbit--five" />
                    <span className="home-hero__marker home-hero__marker--one" />
                    <span className="home-hero__marker home-hero__marker--two" />
                    <span className="home-hero__marker home-hero__marker--three" />
                    <span className="home-hero__marker home-hero__marker--four" />
                    <span className="home-hero__marker home-hero__marker--five" />
                    <span className="home-hero__marker home-hero__marker--six" />
                </div>
            </div>

            <div className="home-hero__content">
                <h1 className="home-hero__title" id="home-title">
                    <img src={yaLabsLogo} alt="YA LABS" />
                </h1>
                <p className="home-hero__slogan">
                    <span>
                        Code. Automate. <strong>Scale.</strong>
                    </span>
                </p>
            </div>

            <a className="home-hero__scroll" href="#organizacao" aria-label="Ir para a seção sobre a organização">
                <span>scroll</span>
                <span aria-hidden="true">↓</span>
            </a>
        </section>
    );
}
