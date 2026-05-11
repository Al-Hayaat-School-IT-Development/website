import { Container, Section } from '@/components/layout';
import { FadeIn } from '@/components/ui';

export interface DonateVerseSectionProps {
  id?: string;
  arabic: string;
  translation: string;
  reference: string;
  className?: string;
}

export function DonateVerseSection({
  id,
  arabic,
  translation,
  reference,
  className,
}: Readonly<DonateVerseSectionProps>) {
  return (
    <Section id={id} background="white" padding="lg" className={className}>
      <Container maxWidth="7xl">
        <FadeIn>
          <div className="mx-auto max-w-5xl text-center">
            <p
              lang="ar"
              dir="rtl"
              className="whitespace-pre-line text-arabic text-[1.9rem] leading-[1.9] text-brand-black/85 sm:text-[2.35rem]"
            >
              {arabic}
            </p>
            <p className="mx-auto mt-6 max-w-4xl text-lg leading-relaxed text-brand-black/75">
              {translation}
            </p>
            <p className="mt-3 text-sm font-medium uppercase tracking-[0.24em] text-brand-black/55">
              {reference}
            </p>
          </div>
        </FadeIn>
      </Container>
    </Section>
  );
}
