import Image from 'next/image';
import Link from 'next/link';
import { Container, Section } from '@/components/layout';
import { FadeIn, subjectIconList } from '@/components/ui';
import { Button } from '@/components/ui/button';

export interface HomeCurriculumSectionProps {
  id?: string;
  heading: string;
  intro: string;
  subjects: string[];
  cta: { label: string; href: string };
  className?: string;
}

export function HomeCurriculumSection({
  id,
  heading,
  intro,
  subjects,
  cta,
  className,
}: HomeCurriculumSectionProps) {
  return (
    <Section
      id={id}
      background="white"
      padding="none"
      className={`relative overflow-hidden py-20${className ? ` ${className}` : ''}`}
    >
      <div className="pointer-events-none absolute -bottom-[6.375rem] -right-[5.375rem]" aria-hidden="true">
        <Image src="/images/dotted.png" alt="" width={270} height={254} />
      </div>
      <Container maxWidth="7xl">
        <FadeIn>
          <div className="flex flex-col gap-12 lg:flex-row lg:items-start lg:gap-20">
            <div id="home-curriculum-header" className="lg:max-w-[32rem] lg:shrink-0">
              <h2 className="text-brand-black">{heading}</h2>
              <p className="mt-4 text-lg text-brand-black/65">{intro}</p>
            </div>
            <div id="home-curriculum-subjects" className="w-full">
              <ul className="mb-10 grid grid-cols-1 gap-5 sm:grid-cols-2">
                {subjects.map((subject, idx) => (
                  <li key={subject} className="flex items-center gap-6 text-base font-medium text-brand-black">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center text-brand-black/70">
                      {subjectIconList[idx]}
                    </span>
                    {subject}
                  </li>
                ))}
              </ul>
              <Button render={<Link href={cta.href} />} size="sm">
                {cta.label}
              </Button>
            </div>
          </div>
        </FadeIn>
      </Container>
    </Section>
  );
}
