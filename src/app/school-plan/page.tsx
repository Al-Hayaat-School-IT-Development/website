import Link from 'next/link';
import { Container, Section, PageHeader } from '@/components/layout';
import { AccordionList, CTASection, FadeIn } from '@/components/ui';
import { Button } from '@/components/ui/button';
import content from '@/content/school-plan.json';

export const metadata = {
  title: 'School Plans | Al-Hayaat School',
  description:
    'Al-Hayaat School is set to open its doors in September 2026, offering a faith-based, high-quality education for the Kitchener-Waterloo community.',
};

export default function SchoolPlanPage() {
  const phaseItems = content.openingPlan.phases.map((phase) => ({
    id: phase.id,
    trigger: phase.trigger,
    content: <p className="text-muted-foreground">{phase.content}</p>,
  }));

  return (
    <>
      <Section background="gray" padding="sm">
        <Container>
          <PageHeader
            title={content.hero.title}
            breadcrumbs={content.hero.breadcrumbs}
          />
        </Container>
      </Section>

      {/* Intro + Opening Plan */}
      <Section background="white" padding="lg">
        <Container maxWidth="xl">
          <FadeIn>
            <p className="mb-8 text-lg leading-relaxed text-foreground">
              {content.intro.body}
            </p>
            <h2 className="mb-4 text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              {content.openingPlan.heading}
            </h2>
            <AccordionList
              items={phaseItems}
              type="single"
              defaultValue="phase-2026"
              className="mb-6"
            />
            <p className="text-base leading-relaxed text-muted-foreground">
              {content.openingPlan.note}
            </p>
          </FadeIn>
        </Container>
      </Section>

      {/* Connect with Community */}
      <Section background="gray" padding="lg">
        <Container maxWidth="xl">
          <FadeIn>
            <h2 className="mb-4 text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              {content.community.heading}
            </h2>
            <p className="mb-6 text-base leading-relaxed text-muted-foreground">
              {content.community.body}
            </p>
            <Button size="lg" render={<Link href={content.community.cta.href} />}>
              {content.community.cta.label}
            </Button>
          </FadeIn>
        </Container>
      </Section>

      {/* Support Our Mission */}
      <Section background="white" padding="lg">
        <Container maxWidth="xl">
          <FadeIn>
            <h2 className="mb-6 text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              {content.mission.heading}
            </h2>
            <ul className="mb-6 space-y-3">
              {content.mission.points.map((point, i) => (
                <li key={i} className="flex items-start gap-3 text-base leading-relaxed text-muted-foreground">
                  <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-primary" aria-hidden="true" />
                  {point}
                </li>
              ))}
            </ul>
            <Button size="lg" render={<Link href={content.mission.cta.href} />}>
              {content.mission.cta.label}
            </Button>
          </FadeIn>
        </Container>
      </Section>

      {/* CTA */}
      <CTASection
        heading={content.cta.heading}
        body={content.cta.body}
        primaryCta={content.cta.primaryCta}
      />
    </>
  );
}
