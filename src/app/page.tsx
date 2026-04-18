import Image from 'next/image';
import Link from 'next/link';
import { Container, Section } from '@/components/layout';
import { FadeIn, AnimatedCounter, homeWhyIcons, type CurriculumSubjectItem } from '@/components/ui';
import { CTASection, HomeCurriculumSection, HomeFeatureSection, HomeHeroSection, SupportMissionSection, WhySection } from '@/components/sections';
import type { WhySectionCard } from '@/components/sections';
import homeContent from '@/content/home.json';
type Stat = { value: number; suffix: string; label: string };
type Collaborator = {
  id: string;
  title: string;
  description?: string;
  accent: 'cyan-light' | 'yellow' | 'green-2';
  logo: { src: string; alt: string };
};
type NewsArticle = { id: string; title: string; excerpt: string; date: string; href: string };

const WHY_ICONS = homeWhyIcons;

const collaboratorAccentMap = {
  'cyan-light': 'bg-brand-cyan-light',
  yellow: 'bg-brand-yellow',
  'green-2': 'bg-brand-green-2',
} as const;

export const metadata = {
  title: homeContent.meta.title,
  description: homeContent.meta.description,
};

export default function HomePage() {
  const { hero, feature, why, curriculum, growthPlan, collaborators, finalCta } =
    homeContent.sections;

  return (
    <>
      <HomeHeroSection
        headline={hero.headline}
        subtext={hero.subtext}
        cta={hero.cta}
        background={hero.background}
      />

      <HomeFeatureSection
        id="home-feature-section"
        writtenImage={feature.writtenImage}
        featureImage={feature.featureImage}
        paragraphs={feature.paragraphs}
      />

      <WhySection
        id="home-why-section"
        heading={why.heading}
        intro={why.intro}
        cards={why.cards as WhySectionCard[]}
        icons={WHY_ICONS}
        sectionPadding="lg"
        sectionClassName="relative overflow-hidden"
        headingClassName="mb-6"
        introClassName="mb-12 text-lg text-brand-black/65"
        cardsClassName="flex flex-col gap-10"
        decorations={
          <>
            <div
              className="pointer-events-none absolute -right-52 hidden xl:block"
              style={{ top: '-16rem' }}
              aria-hidden="true"
            >
              <Image src="/images/shared/decor/circle-light-green.webp" alt="" width={467} height={467} />
            </div>
            <div
              className="pointer-events-none absolute -left-52 hidden xl:block"
              style={{ bottom: '-7rem', zIndex: -1 }}
              aria-hidden="true"
            >
              <Image src="/images/shared/decor/circle-light-orange.webp" alt="" width={467} height={467} />
            </div>
          </>
        }
      />

      <HomeCurriculumSection
        id="home-curriculum-section"
        heading={curriculum.heading}
        intro={curriculum.intro}
        subjects={curriculum.subjects as CurriculumSubjectItem[]}
        cta={curriculum.cta}
      />

      {/* Growth Plan — hidden to match Webflow (display: none in .padding-section-our-growth-plan) */}
      <Section id="home-growth-plan-section" background="gray" padding="lg" className="hidden">
        <Container maxWidth="7xl">
          <FadeIn>
            <div className="mb-12 text-center">
              <h2 className="text-brand-black">{growthPlan.heading}</h2>
              <p className="mx-auto mt-4 max-w-2xl text-lg text-brand-black/70">{growthPlan.intro}</p>
            </div>
          </FadeIn>

          <div className="mb-16 grid grid-cols-1 gap-8 text-center sm:grid-cols-3">
            {(growthPlan.stats as Stat[]).map((stat, index) => (
              <FadeIn key={`${stat.label}-${index}`} delay={index * 120}>
                <div className="flex flex-col items-center gap-2">
                  <span className="text-5xl font-bold text-brand-blue">
                    <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                  </span>
                  <span className="text-base text-brand-black/70">{stat.label}</span>
                </div>
              </FadeIn>
            ))}
          </div>

          <FadeIn>
            <div className="rounded-2xl bg-white p-8 text-center">
              <h2 className="mb-6 text-brand-black">{growthPlan.educators.heading}</h2>
              <div className="mx-auto max-w-3xl space-y-4">
                {growthPlan.educators.paragraphs.map((paragraph) => (
                  <p key={paragraph} className="text-base leading-relaxed text-brand-black/70">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          </FadeIn>
        </Container>
      </Section>

      {/* Collaborators — hidden to match Webflow (display: none in .padding-section-collaborator) */}
      <Section id="home-collaborators-section" background="white" padding="lg" className="hidden">
        <Container maxWidth="7xl">
          <FadeIn>
            <div className="mb-12 text-center">
              <h2 className="text-brand-black">{collaborators.heading}</h2>
            </div>
          </FadeIn>

          <div className="grid gap-6 lg:grid-cols-3">
            {(collaborators.items as Collaborator[]).map((item, index) => (
              <FadeIn key={item.id} delay={index * 120}>
                <article id={`collaborator-${item.id}`} className="overflow-hidden rounded-xl border border-black/10 bg-white shadow-sm">
                  <div className="flex min-h-36 items-center justify-center bg-white px-8 py-6">
                    <Image
                      src={item.logo.src}
                      alt={item.logo.alt}
                      width={220}
                      height={92}
                      className="max-h-20 w-auto object-contain"
                    />
                  </div>
                  <div className={`min-h-44 px-6 py-6 ${collaboratorAccentMap[item.accent]}`}>
                    {item.description ? (
                      <p className="mb-5 text-sm leading-relaxed text-brand-black/75">{item.description}</p>
                    ) : null}
                    <h3 className="text-[2rem] text-brand-black">{item.title}</h3>
                  </div>
                </article>
              </FadeIn>
            ))}
          </div>
        </Container>
      </Section>

      <SupportMissionSection sectionId="home-support-mission-section" />

      {/* News & Announcements — hidden to match Webflow (.section_home-news-announcement has class "hide") */}
      <Section id="home-news-section" background="gray" padding="lg" className="hidden">
        <Container maxWidth="7xl">
          <FadeIn>
            <div className="mb-12 text-center">
              <h2 className="text-brand-black">{homeContent.sections.news.heading}</h2>
            </div>
          </FadeIn>
          <div className="grid gap-6 md:grid-cols-3">
            {(homeContent.sections.news.articles as NewsArticle[]).map((article, index) => (
              <FadeIn key={article.id} delay={index * 120}>
                <article id={`news-article-${article.id}`} className="flex h-full flex-col overflow-hidden rounded-xl border border-black/10 bg-white shadow-sm">
                  <div className="flex flex-1 flex-col p-6">
                    <p className="mb-3 text-xs font-medium uppercase tracking-widest text-brand-blue">
                      {new Date(article.date).toLocaleDateString('en-CA', { year: 'numeric', month: 'long', day: 'numeric' })}
                    </p>
                    <h3 className="mb-3 text-[1.5rem] leading-snug text-brand-black">{article.title}</h3>
                    <p className="flex-1 text-sm leading-relaxed text-brand-black/65">{article.excerpt}</p>
                    <div className="mt-5">
                      <Link
                        href={article.href}
                        className="text-sm font-semibold text-brand-blue hover:underline"
                      >
                        Read more →
                      </Link>
                    </div>
                  </div>
                </article>
              </FadeIn>
            ))}
          </div>
        </Container>
      </Section>

      <CTASection
        id="home-final-cta-section"
        heading={finalCta.heading}
        body={finalCta.body}
        primaryCta={finalCta.cta}
        variant="green"
      />
    </>
  );
}
