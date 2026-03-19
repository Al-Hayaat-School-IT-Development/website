import { Container, Grid, Section } from '@/components/layout';
import { ColoredBorderCard, EnrollNowButton, FadeIn } from '@/components/ui';
import { BookOpen, GraduationCap, Heart } from 'lucide-react';

export interface WhyChooseCard {
  id: string;
  title: string;
  description: string;
}

export interface AdmissionsWhyChooseSectionProps {
  id?: string;
  className?: string;
  heading: string;
  cards: WhyChooseCard[];
}

const ICONS = [
  <GraduationCap key="academic" className="h-6 w-6 text-brand-blue" />,
  <BookOpen key="faith" className="h-6 w-6 text-brand-blue" />,
  <Heart key="holistic" className="h-6 w-6 text-brand-blue" />,
];

export function AdmissionsWhyChooseSection({
  id,
  className,
  heading,
  cards,
}: AdmissionsWhyChooseSectionProps) {
  return (
    <Section id={id} background="gray" padding="lg" className={className}>
      <Container>
        <FadeIn>
          <div className="mb-8 max-w-3xl">
            <h2 className="text-brand-black">{heading}</h2>
          </div>
          <Grid columns={3} gap="lg">
            {cards.map((card, index) => (
              <ColoredBorderCard
                key={card.id}
                accent="blue"
                className="h-full rounded-[1.5rem] bg-white"
              >
                <div className="flex items-center justify-between gap-4">
                  <h3 className="text-[1.75rem] text-brand-black">{card.title}</h3>
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-off-white">
                    {ICONS[index]}
                  </div>
                </div>
                <p className="text-base leading-relaxed text-brand-black/70">{card.description}</p>
                <div className="pt-2">
                  <EnrollNowButton
                    variant="ghost"
                    className="px-0 text-brand-blue hover:bg-transparent hover:text-brand-blue/80"
                  />
                </div>
              </ColoredBorderCard>
            ))}
          </Grid>
        </FadeIn>
      </Container>
    </Section>
  );
}
