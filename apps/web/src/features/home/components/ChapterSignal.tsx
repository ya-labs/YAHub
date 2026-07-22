type ChapterSignalProps = {
    variant?: 'blue' | 'orange';
};

export function ChapterSignal({ variant = 'blue' }: ChapterSignalProps) {
    return (
        <div className={`home-chapter-signal home-chapter-signal--${variant}`} aria-hidden="true">
            <svg viewBox="0 0 560 1000" preserveAspectRatio="none">
                <path className="home-chapter-signal__path home-chapter-signal__path--one" d="M610 -70 C190 80 690 300 270 480 S80 790 590 1060" pathLength="1" />
                <path className="home-chapter-signal__path home-chapter-signal__path--two" d="M650 50 C300 170 610 350 330 520 S140 800 640 950" pathLength="1" />
                <path className="home-chapter-signal__path home-chapter-signal__path--three" d="M590 180 C360 250 540 410 350 560 S240 790 590 860" pathLength="1" />
            </svg>
        </div>
    );
}
