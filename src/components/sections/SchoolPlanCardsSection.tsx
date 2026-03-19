import Link from 'next/link';
import { CheckCircle2 } from 'lucide-react';
import { Container, Section } from '@/components/layout';
import { ColoredBorderCard, FadeIn } from '@/components/ui';
import { Button } from '@/components/ui/button';

export interface SchoolPlanChecklistCard {
  type: 'checklist';
  accent: 'yellow' | 'blue' | 'green' | 'orange';
  className?: string;
  heading: string;
  items: string[];
}

export interface SchoolPlanBodyCard {
  type: 'body';
  accent: 'yellow' | 'blue' | 'green' | 'orange';
  className?: string;
  heading: string;
  body: string;
  cta?: { label: string; href: string };
}

export type SchoolPlanCard = SchoolPlanChecklistCard | SchoolPlanBodyCard;

export interface SchoolPlanCardsSectionProps {
  id?: string;
  cards: SchoolPlanCard[];
  className?: string;
}

export function SchoolPlanCardsSection({
  id,
  cards,
  className,
}: SchoolPlanCardsSectionProps) {
  return (
    <Section
      id={id}
      background="off-white-bg"
      padding="none"
      className={`pt-[3.9375rem] pb-[3.125rem]${className ? ` ${className}` : ''}`}
    >
      <Container maxWidth="7xl">
        <div id="school-plans-card-container" className="grid gap-[3.125rem] lg:grid-cols-2">
          {cards.map((card, index) => (
            <FadeIn key={card.heading} delay={index * 120}>
              <ColoredBorderCard
                accent={card.accent}
                className={`h-full rounded-[1.5rem] border-0 ${card.className ?? ''}`}
              >
                <h3 className="text-[2rem] text-brand-black">{card.heading}</h3>

                {card.type === 'checklist' && (
                  <ul className="space-y-4">
                    {card.items.map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-brand-blue" />
                        <span className="text-base leading-relaxed text-brand-black/75">{item}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {card.type === 'body' && (
                  <>
                    <p className="text-base leading-relaxed text-brand-black/75">{card.body}</p>
                    {card.cta && (
                      <div className="pt-2">
                        <Button render={<Link href={card.cta.href} />}>
                          {card.cta.label}
                        </Button>
                      </div>
                    )}
                  </>
                )}
              </ColoredBorderCard>
            </FadeIn>
          ))}
        </div>
      </Container>
    </Section>
  );
}
