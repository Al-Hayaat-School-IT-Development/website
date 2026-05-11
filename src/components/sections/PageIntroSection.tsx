import { Container, Section } from '@/components/layout';
import { FadeIn } from '@/components/ui';

export interface PageIntroSectionProps {
  id?: string;
  headline: string;
  body: string | string[];
  className?: string;
}

export function PageIntroSection({ id, headline, body, className }: Readonly<PageIntroSectionProps>) {
  const paragraphs = Array.isArray(body) ? body : [body];

  return (
    <Section
      id={id}
      background="white"
      padding="none"
      className={`py-[6rem]${className ? ` ${className}` : ''}`}
    >
      <Container maxWidth="7xl">
        <FadeIn>
          <div>
            <h2 className="mb-[0.875rem] text-brand-black">{headline}</h2>
            {paragraphs.map((p) => (
              <p key={p} className="mt-5 text-[1.25rem] leading-relaxed text-brand-black/75">
                {p}
              </p>
            ))}
          </div>
        </FadeIn>
      </Container>
    </Section>
  );
}
