import { Container, Section } from '@/components/layout';
import { FadeIn } from '@/components/ui';

export interface AdmissionsHowToApplySectionProps {
  id?: string;
  heading: string;
  intro: string;
  steps: string[];
  className?: string;
}

export function AdmissionsHowToApplySection({
  id,
  heading,
  intro,
  steps,
  className,
}: Readonly<AdmissionsHowToApplySectionProps>) {
  return (
    <Section id={id} background="white" padding="lg" className={className}>
      <Container>
        <div className="grid gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
          <FadeIn>
            <div className="max-w-xl">
              <h2 className="text-brand-black">{heading}</h2>
              <p className="mt-4 text-lg leading-relaxed text-brand-black/70">{intro}</p>
            </div>
          </FadeIn>
          <FadeIn delay={120}>
            <ol className="space-y-5">
              {steps.map((step, index) => (
                <li
                  key={step}
                  className="flex gap-4 rounded-[1.25rem] border border-black/10 bg-brand-off-white p-5"
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-blue text-sm font-bold text-white">
                    {index + 1}
                  </span>
                  <p className="pt-1 text-base leading-relaxed text-brand-black/75">{step}</p>
                </li>
              ))}
            </ol>
          </FadeIn>
        </div>
      </Container>
    </Section>
  );
}
