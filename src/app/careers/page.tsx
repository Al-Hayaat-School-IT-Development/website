import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Container, Section } from '@/components/layout';
import { FadeIn, SupportMissionSection } from '@/components/ui';
import { Button } from '@/components/ui/button';
import careersContent from '@/content/careers.json';

export const metadata: Metadata = {
  title: careersContent.meta.title,
  description: careersContent.meta.description,
};

export default function CareersPage() {
  const { hero, intro, why_join, openings } = careersContent;

  return (
    <main className="min-h-screen bg-white">

      {/* ── Hero ── matches Webflow .seciton_cta: green bg + cta-bg.webp, two stacked headings, py-[6rem] */}
      <section
        id="careers-hero-section"
        className="relative overflow-hidden bg-brand-green text-white"
      >
        <Image
          src="/images/cta-bg.webp"
          alt=""
          fill
          className="object-cover object-center"
          aria-hidden="true"
          priority
        />
        <div className="relative z-10 px-4 sm:px-6 lg:px-10">
          <div className="mx-auto max-w-7xl py-[6rem]">
            <div className="max-w-[25rem]">
              <h2 className="font-display text-[5rem] font-normal leading-[0.85] text-white">
                {hero.join_heading}
              </h2>
            </div>
            <div className="mt-6 max-w-[25rem]">
              <p className="text-[1rem] text-white">{hero.headline}</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Intro + Why Join + Job Openings ── all inside one donate-content-wrapper inside container-large */}
      <Section id="careers-content-section" background="white" padding="none">
        <Container maxWidth="7xl">
          <FadeIn>
            <div className="mx-auto max-w-[45.25rem] py-[3rem]">

              {/* Welcome / Intro */}
              <div id="careers-intro-section" className="mb-[2.0625rem]">
                <h2 className="mb-[0.875rem] text-brand-black">{intro.heading}</h2>
                {intro.body.split('\n\n').map((paragraph) => (
                  <p key={paragraph} className="mt-5 text-[1.25rem] leading-relaxed text-brand-black/75">
                    {paragraph}
                  </p>
                ))}
              </div>

              {/* Why Join */}
              <div id="careers-why-join-section" className="mb-[2.0625rem]">
                <h2 className="mb-[0.875rem] text-brand-black">{why_join.heading}</h2>
                <ul className="space-y-4 pl-0 list-none">
                  {why_join.reasons.map((reason) => (
                    <li
                      key={reason.id}
                      className="relative pl-[2.5rem] text-[1.125rem] leading-relaxed text-brand-black/75"
                      style={{
                        backgroundImage: "url('/images/bullet.png')",
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: '5px 5px',
                        backgroundSize: 'auto',
                        marginBottom: '1rem',
                      }}
                    >
                      <strong>{reason.title}:</strong> {reason.description}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Current Job Openings — only renders when positions exist */}
              {openings.positions.length > 0 && (
                <div id="careers-openings-section" className="mb-[2.0625rem]">
                  <h2 className="mb-[2.0625rem] text-brand-black">{openings.heading}</h2>
                  <div className="flex flex-col gap-[1.5rem]">
                    {openings.positions.map((position) => (
                      <div
                        key={position.id}
                        className="rounded-[1.25rem] border border-[#d9d9d9] border-b-[0.625rem] border-b-brand-green p-[1.75rem]"
                      >
                        <h4 className="mb-3 text-[1.5rem] font-semibold text-brand-black">
                          <Link
                            href={`/careers/${position.slug}`}
                            className="hover:underline"
                          >
                            {position.title}
                          </Link>
                        </h4>
                        <p className="mb-4 text-[1.125rem] leading-relaxed text-brand-black/75">
                          {position.description}
                        </p>
                        <Button
                          render={
                            <Link
                              href={`/careers/apply?position=${encodeURIComponent(position.title)}`}
                            />
                          }
                        >
                          Apply
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>
          </FadeIn>
        </Container>
      </Section>

      {/* ── Support Mission ── shared component (same as home page), matches Webflow .support-mission-component */}
      <SupportMissionSection sectionId="careers-support-mission-section" />

    </main>
  );
}
