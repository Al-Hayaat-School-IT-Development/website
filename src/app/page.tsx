import { BookOpen, GraduationCap, Star, Users } from 'lucide-react';
import { Section, Container, Grid } from '@/components/layout';
import {
  HeroSection,
  WhyCard,
  CTASection,
  FadeIn,
  AnimatedCounter,
} from '@/components/ui';
import homeContent from '@/content/home.json';

type WhyCard = { id: string; title: string; description: string };
type Stat = { value: number; suffix: string; label: string };

const WHY_ICONS = [
  <BookOpen key="faith" className="h-6 w-6 text-[#1e3a5f]" />,
  <GraduationCap key="curriculum" className="h-6 w-6 text-[#1e3a5f]" />,
  <Star key="excellence" className="h-6 w-6 text-[#1e3a5f]" />,
  <Users key="community" className="h-6 w-6 text-[#1e3a5f]" />,
];

export const metadata = {
  title: homeContent.meta.title,
  description: homeContent.meta.description,
};

export default function HomePage() {
  const { hero, welcome, why, curriculum, growthPlan, supportMission, finalCta } =
    homeContent.sections;

  return (
    <>
      {/* ── Hero ────────────────────────────────────────────────────────── */}
      <HeroSection
        headline={hero.headline}
        subtext={hero.subtext}
        cta={hero.cta}
        backgroundVariant="primary"
      />

      {/* ── Welcome ─────────────────────────────────────────────────────── */}
      <Section background="white" padding="lg">
        <Container maxWidth="7xl">
          <FadeIn>
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                {welcome.heading}
              </h2>
              <div className="mt-6 space-y-4">
                {(welcome.paragraphs as string[]).map((p, i) => (
                  <p key={i} className="text-lg leading-relaxed text-gray-600">
                    {p}
                  </p>
                ))}
              </div>
            </div>
          </FadeIn>
        </Container>
      </Section>

      {/* ── Why Al-Hayaat ────────────────────────────────────────────────── */}
      <Section background="gray" padding="lg">
        <Container maxWidth="7xl">
          <FadeIn>
            <div className="mb-12 text-center">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                {why.heading}
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600">{why.intro}</p>
            </div>
          </FadeIn>
          <Grid columns={2} gap="lg">
            {(why.cards as WhyCard[]).map((card, i) => (
              <FadeIn key={card.id} delay={i * 100}>
                <WhyCard
                  icon={WHY_ICONS[i % WHY_ICONS.length]}
                  title={card.title}
                  description={card.description}
                  index={i}
                />
              </FadeIn>
            ))}
          </Grid>
        </Container>
      </Section>

      {/* ── Curriculum ───────────────────────────────────────────────────── */}
      <Section background="white" padding="lg">
        <Container maxWidth="7xl">
          <FadeIn>
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                {curriculum.heading}
              </h2>
              <p className="mt-4 text-lg text-gray-600">{curriculum.intro}</p>
              <ul className="mt-8 grid grid-cols-2 gap-3 text-left sm:grid-cols-3 md:grid-cols-4">
                {(curriculum.subjects as string[]).map((subject) => (
                  <li
                    key={subject}
                    className="flex items-center gap-2 rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-sm font-medium text-gray-700"
                  >
                    <span className="h-2 w-2 flex-shrink-0 rounded-full bg-[#1e3a5f]" />
                    {subject}
                  </li>
                ))}
              </ul>
              <div className="mt-8">
                <a
                  href={curriculum.cta.href}
                  className="inline-flex items-center rounded-lg bg-[#1e3a5f] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#162d4a]"
                >
                  {curriculum.cta.label}
                </a>
              </div>
            </div>
          </FadeIn>
        </Container>
      </Section>

      {/* ── Growth Plan / Stats ──────────────────────────────────────────── */}
      <Section background="primary" padding="lg">
        <Container maxWidth="7xl">
          <FadeIn>
            <div className="mb-12 text-center">
              <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                {growthPlan.heading}
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-lg text-white/80">{growthPlan.intro}</p>
            </div>
          </FadeIn>

          {/* Stats row */}
          <div className="mb-16 grid grid-cols-1 gap-8 text-center sm:grid-cols-3">
            {(growthPlan.stats as Stat[]).map((stat, i) => (
              <FadeIn key={i} delay={i * 120}>
                <div className="flex flex-col items-center gap-2">
                  <span className="text-5xl font-bold text-white">
                    <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                  </span>
                  <span className="text-base text-white/70">{stat.label}</span>
                </div>
              </FadeIn>
            ))}
          </div>

          {/* Educators sub-section */}
          <FadeIn>
            <div className="rounded-2xl bg-white/10 p-8 text-center">
              <h3 className="mb-6 text-2xl font-semibold text-white">
                {growthPlan.educators.heading}
              </h3>
              <div className="mx-auto max-w-3xl space-y-4">
                {(growthPlan.educators.paragraphs as string[]).map((p, i) => (
                  <p key={i} className="text-base leading-relaxed text-white/80">
                    {p}
                  </p>
                ))}
              </div>
            </div>
          </FadeIn>
        </Container>
      </Section>

      {/* ── Support Our Mission ──────────────────────────────────────────── */}
      <Section background="gray" padding="lg">
        <Container maxWidth="7xl">
          <FadeIn>
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                {supportMission.heading}
              </h2>
              <ul className="mt-6 space-y-3">
                {(supportMission.points as string[]).map((point, i) => (
                  <li key={i} className="flex items-start gap-3 text-left text-gray-600">
                    <span className="mt-1.5 h-2 w-2 flex-shrink-0 rounded-full bg-[#1e3a5f]" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-8">
                <a
                  href={supportMission.cta.href}
                  className="inline-flex items-center rounded-lg bg-[#1e3a5f] px-8 py-3 text-base font-semibold text-white transition-colors hover:bg-[#162d4a]"
                >
                  {supportMission.cta.label}
                </a>
              </div>
            </div>
          </FadeIn>
        </Container>
      </Section>

      {/* ── Final CTA ────────────────────────────────────────────────────── */}
      <CTASection
        heading={finalCta.heading}
        body={finalCta.body}
        primaryCta={finalCta.cta}
        variant="primary"
      />
    </>
  );
}

