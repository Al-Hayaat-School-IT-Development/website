import Link from 'next/link';
import { Container, Section } from '@/components/layout';
import { ColoredBorderCard, FadeIn } from '@/components/ui';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

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
  /** Intro above the card grid — same title/body styles as `PageIntroSection`, left-aligned. */
  intro?: {
    headline: string;
    body: string | string[];
    /** Preserve anchor targets when intro moved into this section. */
    id?: string;
  };
  cards: SchoolPlanCard[];
  className?: string;
}

const listCheckStyle = {
  backgroundImage: "url('/images/list-check.svg')",
  backgroundRepeat: 'no-repeat' as const,
  backgroundPosition: '5px 5px',
  backgroundSize: 'auto' as const,
};

export function SchoolPlanCardsSection({
  id,
  intro,
  cards,
  className,
}: Readonly<SchoolPlanCardsSectionProps>) {
  return (
    <Section
      id={id}
      background="off-white-bg"
      padding="none"
      className={cn(
        'pt-[3.9375rem] pb-[3.125rem]',
        className,
      )}
    >
      <Container maxWidth="7xl">
        {intro ? (
          <FadeIn>
            <div id={intro.id} className="relative mb-[5.1875rem] text-left">
              <h2 className="mb-[0.875rem] text-brand-black">{intro.headline}</h2>
              {(Array.isArray(intro.body) ? intro.body : [intro.body]).map((p) => (
                <p key={p} className="mt-5 text-[1.25rem] leading-relaxed text-brand-black/75">
                  {p}
                </p>
              ))}
            </div>
          </FadeIn>
        ) : null}

        <div
          id="school-plans-card-container"
          className="grid gap-10 sm:gap-12 lg:gap-[3.125rem] lg:grid-cols-2"
        >
          {cards.map((card, index) => (
            <FadeIn key={card.heading} delay={index * 120}>
              <ColoredBorderCard
                accent={card.accent}
                contentClassName="gap-6"
                className={cn(
                  'h-full rounded-[1.25rem] border border-[#d9d9d9] bg-white p-[1.625rem] shadow-none',
                  card.className,
                )}
              >
                <h3 className="font-display text-[2.5rem] font-normal leading-none text-brand-black">
                  {card.heading}
                </h3>

                {card.type === 'checklist' && (
                  <ul className="m-0 list-none space-y-4 p-0">
                    {card.items.map((item) => (
                      <li
                        key={item}
                        className="relative mb-0 pl-[2.5rem] text-[1.2rem] font-medium leading-[1.3] text-brand-black/75"
                        style={listCheckStyle}
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                )}

                {card.type === 'body' && (
                  <>
                    <p className="text-[1.2rem] font-medium leading-[1.3] text-brand-black/75">{card.body}</p>
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
