import { Container, Section } from '@/components/layout';
import { ColoredBorderCard, FadeIn } from '@/components/ui';
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
}: Readonly<AdmissionsWhyChooseSectionProps>) {
  return (
    <Section id={id} background="gray" padding="lg" className={className}>
      <Container>
        <FadeIn className="flex w-full max-w-none flex-col">
          <div className="mb-8 w-full shrink-0">
            <h2 className="w-full text-brand-black">{heading}</h2>
          </div>
          <div className="w-full min-w-0 shrink-0">
            <ColoredBorderCard accent="blue" className="w-full rounded-[1.5rem] bg-white">
              <ul className="m-0 list-none p-0">
                {cards.map((card, index) => (
                  <li
                    key={card.id}
                    className={index > 0 ? 'mt-8 border-t border-black/10 pt-8' : undefined}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="min-w-0 flex-1">
                        <h3 className="text-[1.75rem] text-brand-black">{card.title}</h3>
                        <p className="mt-2 text-base leading-relaxed text-brand-black/70">{card.description}</p>
                      </div>
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-off-white">
                        {ICONS[index]}
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </ColoredBorderCard>
          </div>
        </FadeIn>
      </Container>
    </Section>
  );
}
