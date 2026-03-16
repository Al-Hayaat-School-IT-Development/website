import {
  BookOpen,
  GraduationCap,
  Calculator,
  BookMarked,
  FlaskConical,
  Globe,
  Users,
  type LucideIcon,
} from 'lucide-react';
import { Container, Section, Grid, PageHeader } from '@/components/layout';
import { CTASection, FadeIn } from '@/components/ui';
import { Card, CardContent } from '@/components/ui/card';
import content from '@/content/curriculum.json';

const ICON_MAP: Record<string, LucideIcon> = {
  BookOpen,
  GraduationCap,
  Calculator,
  BookMarked,
  FlaskConical,
  Globe,
  Users,
};

export const metadata = {
  title: 'Academic and Curriculum Focus | Al-Hayaat School',
  description:
    'Comprehensive education integrating Ontario standards with teachings. Language arts, Quranic education, mathematics, science, Arabic & more.',
};

export default function CurriculumPage() {
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

      {/* Intro */}
      <Section background="white" padding="lg">
        <Container maxWidth="xl">
          <FadeIn>
            <p className="text-lg leading-relaxed text-foreground">
              {content.intro.body}
            </p>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              {content.intro.subtext}
            </p>
          </FadeIn>
        </Container>
      </Section>

      {/* Subjects */}
      <Section background="gray" padding="lg">
        <Container>
          <FadeIn>
            <Grid columns={4} gap="md">
              {content.subjects.map((subject) => {
                const IconComponent = ICON_MAP[subject.icon];
                return (
                  <Card
                    key={subject.id}
                    className="transition-shadow duration-200 hover:shadow-lg"
                  >
                    <CardContent className="flex flex-col items-center gap-3 p-6 text-center">
                      {IconComponent && (
                        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-muted">
                          <IconComponent
                            size={24}
                            aria-hidden="true"
                            className="text-primary"
                          />
                        </div>
                      )}
                      <span className="text-base font-semibold capitalize text-foreground">
                        {subject.label}
                      </span>
                    </CardContent>
                  </Card>
                );
              })}
            </Grid>
          </FadeIn>
        </Container>
      </Section>

      {/* Guidance from Experienced Educators */}
      <Section background="white" padding="lg">
        <Container maxWidth="xl">
          <FadeIn>
            <h2 className="mb-6 text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              {content.educators.heading}
            </h2>
            <p className="text-base leading-relaxed text-muted-foreground">
              {content.educators.body}
            </p>
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
