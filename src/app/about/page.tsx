import { BookOpen, GraduationCap, Star, Users, MapPin } from 'lucide-react';
import { Section, Container, Grid, PageHeader } from '@/components/layout';
import { HeroSection, WhyCard, CTASection, FadeIn } from '@/components/ui';
import aboutContent from '@/content/about.json';

type WhyCardItem = { id: string; title: string; description: string };
type TeamMember = { id: string; name: string; role: string; bio: string };

const WHY_ICONS = [
  <BookOpen key="faith" className="h-6 w-6 text-[#1e3a5f]" />,
  <GraduationCap key="curriculum" className="h-6 w-6 text-[#1e3a5f]" />,
  <Star key="excellence" className="h-6 w-6 text-[#1e3a5f]" />,
  <Users key="community" className="h-6 w-6 text-[#1e3a5f]" />,
];

export const metadata = {
  title: aboutContent.meta.title,
  description: aboutContent.meta.description,
};

export default function AboutPage() {
  const { hero, missionVision, team, why, office, cta } = aboutContent.sections;

  return (
    <>
      {/* ── Hero ────────────────────────────────────────────────────────── */}
      <HeroSection
        headline={hero.headline}
        subtext={hero.subtext}
        cta={hero.cta}
        backgroundVariant="primary"
      />

      {/* ── Breadcrumb / Page header ─────────────────────────────────────── */}
      <Section background="white" padding="sm">
        <Container maxWidth="7xl">
          <PageHeader
            title=""
            breadcrumbs={[
              { label: 'Home', href: '/' },
              { label: 'About Us' },
            ]}
          />
        </Container>
      </Section>

      {/* ── Mission, Vision & Values ─────────────────────────────────────── */}
      <Section background="gray" padding="lg">
        <Container maxWidth="7xl">
          <FadeIn>
            <h2 className="mb-10 text-center text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              {missionVision.heading}
            </h2>
          </FadeIn>
          <Grid columns={2} gap="lg">
            <FadeIn delay={0}>
              <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
                <span className="mb-4 inline-block rounded-full bg-[#1e3a5f]/10 px-4 py-1.5 text-sm font-semibold text-[#1e3a5f]">
                  {missionVision.mission.label}
                </span>
                <p className="text-base leading-relaxed text-gray-700">
                  {missionVision.mission.text}
                </p>
              </div>
            </FadeIn>
            <FadeIn delay={120}>
              <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
                <span className="mb-4 inline-block rounded-full bg-[#1e3a5f]/10 px-4 py-1.5 text-sm font-semibold text-[#1e3a5f]">
                  {missionVision.vision.label}
                </span>
                <p className="text-base leading-relaxed text-gray-700">
                  {missionVision.vision.text}
                </p>
              </div>
            </FadeIn>
          </Grid>
        </Container>
      </Section>

      {/* ── Our Team ─────────────────────────────────────────────────────── */}
      <Section background="white" padding="lg">
        <Container maxWidth="7xl">
          <FadeIn>
            <h2 className="mb-12 text-center text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              {team.heading}
            </h2>
          </FadeIn>
          <Grid columns={3} gap="lg">
            {(team.members as TeamMember[]).map((member, i) => (
              <FadeIn key={member.id} delay={i * 100}>
                <div className="flex flex-col rounded-2xl border border-gray-200 bg-gray-50 p-6 shadow-sm">
                  <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#1e3a5f] text-xl font-bold text-white">
                    {member.name
                      .split(' ')
                      .filter((w) => /^[A-Z]/.test(w))
                      .slice(0, 2)
                      .map((w) => w[0])
                      .join('')}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">{member.name}</h3>
                  <p className="mb-3 text-sm font-medium text-[#1e3a5f]">{member.role}</p>
                  <p className="text-sm leading-relaxed text-gray-600">{member.bio}</p>
                </div>
              </FadeIn>
            ))}
          </Grid>
          {team.boardCaption && (
            <FadeIn delay={300}>
              <p className="mt-8 text-center text-sm text-gray-500">{team.boardCaption}</p>
            </FadeIn>
          )}
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
            {(why.cards as WhyCardItem[]).map((card, i) => (
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

      {/* ── Our Office ───────────────────────────────────────────────────── */}
      <Section background="white" padding="lg">
        <Container maxWidth="7xl">
          <FadeIn>
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                {office.heading}
              </h2>
              <div className="mt-4 flex items-center justify-center gap-2 text-[#1e3a5f]">
                <MapPin className="h-5 w-5 flex-shrink-0" />
                <span className="font-semibold">{office.address}</span>
              </div>
              <p className="mt-4 text-lg leading-relaxed text-gray-600">{office.description}</p>
            </div>
          </FadeIn>
        </Container>
      </Section>

      {/* ── CTA ──────────────────────────────────────────────────────────── */}
      <CTASection
        heading={cta.heading}
        body={cta.body}
        primaryCta={cta.cta}
        variant="primary"
      />
    </>
  );
}
