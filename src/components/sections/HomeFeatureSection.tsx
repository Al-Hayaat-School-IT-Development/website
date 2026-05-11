import Image from 'next/image';
import { Container, Section } from '@/components/layout';
import { FadeIn } from '@/components/ui';

/** Matches Webflow `section_home-feature` + `home-feature-component` (index.html). */
export interface HomeFeatureSectionProps {
  id?: string;
  writtenImage: string;
  featureImage: { src: string; alt: string };
  paragraphs: string[];
  className?: string;
}

const decorColorMap = {
  'cyan-light': 'bg-brand-cyan-light',
  yellow: 'bg-brand-yellow',
  'green-2': 'bg-brand-green-2',
  white: 'bg-white',
} as const;

type DecorColor = keyof typeof decorColorMap;

export function HomeFeatureSection({
  id = 'home-feature-section',
  writtenImage,
  featureImage,
  paragraphs,
  className,
}: Readonly<HomeFeatureSectionProps>) {
  return (
    <Section
      id={id}
      background="primary"
      padding="none"
      className={`text-white${className ? ` ${className}` : ''}`}
    >
      {/* Webflow: .padding-section-feature */}
      <div className="pt-[5.4375rem] pb-[5.125rem]">
        <Container maxWidth="7xl">
          <div id="home-feature-component" className="home-feature-component">
            {/* Webflow: .margin-bottom.margin-109 wraps .feature-subtext-wrapper */}
            <FadeIn>
              <div className="mb-[6.8125rem]">
                <div
                  id="home-feature-subtext"
                  className="feature-subtext-wrapper relative mx-auto w-full max-w-[69.3125rem] text-center"
                >
                  <DecorDots />
                  {/* Top padding keeps decor dots (esp. green, which tracks top/right on narrow viewports) from overlapping the calligraphy when resizing. */}
                  <div className="relative z-[1] mb-8 pt-12 max-md:pt-14">
                    <Image
                      src={writtenImage}
                      alt="Arabic calligraphy spelling Islam."
                      width={170}
                      height={46}
                      className="mx-auto h-auto w-auto"
                    />
                  </div>
                  <div className="relative z-[1] space-y-6 font-sans text-[1.4rem] leading-[1.3] text-white/90">
                    {paragraphs.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </div>
                </div>
              </div>
            </FadeIn>

            {/* Webflow: .feature-image-wrapper + img.image-4 — full width of container */}
            <FadeIn delay={120}>
              <div
                id="home-feature-image-container"
                className="feature-image-wrapper relative z-[1] flex w-full justify-center overflow-hidden rounded-[0.75rem]"
              >
                <Image
                  src={featureImage.src}
                  alt={featureImage.alt}
                  width={1112}
                  height={740}
                  className="mx-auto h-auto w-full object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1280px) 100vw, 1200px"
                />
              </div>
            </FadeIn>
          </div>
        </Container>
      </div>
    </Section>
  );
}

/** Decorative accents — positions from Webflow `.feature-decor-1` … `.feature-decor-4`. */
function DecorDots() {
  const dots: { className: string; color: DecorColor; size: string }[] = [
    { className: 'top-[3rem] left-[-3rem] max-md:top-[1.8rem] max-md:left-[0.2rem]', color: 'cyan-light', size: 'h-[2.125rem] w-[2.125rem]' },
    { className: 'top-[-2.5rem] left-[13.625rem] max-md:left-[8.525rem]', color: 'yellow', size: 'h-10 w-10' },
    { className: 'top-[-1rem] right-[10.5rem] max-md:right-[8.7rem]', color: 'green-2', size: 'h-8 w-8' },
    { className: 'right-[-3rem] bottom-[-2rem] max-md:right-[3.2rem]', color: 'white', size: 'h-6 w-6' },
  ];

  return (
    <>
      {dots.map((dot, i) => (
        <span
          key={i}
          className={`pointer-events-none absolute z-0 rounded-full ${decorColorMap[dot.color]} ${dot.size} ${dot.className}`}
          aria-hidden="true"
        />
      ))}
    </>
  );
}
