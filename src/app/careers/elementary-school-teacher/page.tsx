import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Container, GreenHero, Section } from '@/components/layout';
import { FadeIn } from '@/components/ui';
import { Button } from '@/components/ui/button';
import { SupportMissionSection } from '@/components/sections';
import careersContent from '@/content/careers.json';

const position = careersContent.openings.positions[0];
const sectionHeadingClass =
  'mb-3 text-[1.75rem] leading-[1.35] font-semibold tracking-[0.01em] text-brand-black/85';
const bodyTextClass = 'text-[1.0625rem] leading-[1.75] text-brand-black/70';

export const metadata: Metadata = {
  title: `${position.title} | Al-Hayaat School Careers`,
  description: position.description,
};

function JobBulletList({ items }: Readonly<{ items: readonly string[] }>) {
  return (
    <ul className="list-none space-y-4 pl-0">
      {items.map((item) => (
        <li
          key={item}
          className="relative mb-4 pl-[2.5rem] text-[1.0625rem] leading-[1.75] text-brand-black/70"
        >
          <Image
            src="/images/shared/ui/bullet.png"
            alt=""
            aria-hidden="true"
            width={16}
            height={16}
            className="absolute left-[5px] top-[5px] h-auto w-auto"
          />
          {item}
        </li>
      ))}
    </ul>
  );
}

export default function ElementaryTeacherPage() {
  return (
    <main className="min-h-screen bg-white">
      <GreenHero id="elementary-teacher-hero-section" title={position.title} />

      <Section id="elementary-teacher-content-section" background="white" padding="none">
        <Container maxWidth="7xl">
          <FadeIn>
            <div className="max-w-[56rem] py-[6rem]">
              <p className="mb-7 text-[1.0625rem] font-medium tracking-[0.01em] text-brand-black/65">
                Grades: {position.grades}
              </p>

              <section id="job-description-section" className="mb-[2.0625rem]">
                <h2 className={sectionHeadingClass}>Job Description</h2>
                <p className={bodyTextClass}>
                  {position.description}
                </p>
              </section>

              <section id="job-responsibilities-section" className="mb-[2.0625rem]">
                <h2 className={sectionHeadingClass}>Key Responsibilities</h2>
                <JobBulletList items={position.responsibilities} />
              </section>

              <section id="job-qualifications-section" className="mb-[2.0625rem]">
                <h2 className={sectionHeadingClass}>Qualifications</h2>
                <JobBulletList items={position.qualifications} />
              </section>

              <section id="job-skills-section" className="mb-[2.0625rem]">
                <h2 className={sectionHeadingClass}>Knowledge and Skills</h2>
                <JobBulletList items={position.skills} />
              </section>

              <section id="job-how-to-apply-section" className="mb-[2.0625rem]">
                <h2 className={sectionHeadingClass}>How to Apply</h2>
                <p className={bodyTextClass}>
                  {position.application_note}
                </p>
                <p className={`mt-5 ${bodyTextClass}`}>
                  {position.how_to_apply}
                </p>
                <div className="mt-8 flex flex-wrap items-center gap-4">
                  <Button
                    size="sm"
                    render={
                      <Link
                        href={`/careers/apply?position=${encodeURIComponent(position.title)}`}
                      />
                    }
                  >
                    Apply online
                  </Button>
                  <Button size="sm" variant="outline" render={<Link href="/careers" />}>
                    Back to Careers
                  </Button>
                </div>
              </section>
            </div>
          </FadeIn>
        </Container>
      </Section>

      <SupportMissionSection sectionId="elementary-teacher-support-mission-section" />
    </main>
  );
}
