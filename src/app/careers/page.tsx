import type { Metadata } from 'next';
import { Container, GreenHero, Section } from '@/components/layout';
import { FadeIn } from '@/components/ui';
import {
  CareersOpeningsSection,
  CareersWhyJoinSection,
  PageIntroSection,
  SupportMissionSection,
} from '@/components/sections';
import careersContent from '@/content/careers.json';

export const metadata: Metadata = {
  title: careersContent.meta.title,
  description: careersContent.meta.description,
};

export default function CareersPage() {
  const { hero, intro, why_join, openings } = careersContent;

  return (
    <main className="min-h-screen bg-white">

      <GreenHero
        id="careers-hero-section"
        title={hero.join_heading}
      />

      {/* ── Intro + Why Join + Job Openings ── all inside one donate-content-wrapper inside container-large */}
      <Section id="careers-content-section" background="white" padding="none">
        <Container maxWidth="7xl">
          <FadeIn>
            <div className="py-[6rem]">

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
              <CareersWhyJoinSection
                id="careers-why-join-section"
                heading={why_join.heading}
                reasons={why_join.reasons}
                className="mb-[2.0625rem]"
              />

              {/* Current Job Openings */}
              <CareersOpeningsSection
                id="careers-openings-section"
                heading={openings.heading}
                positions={openings.positions}
                className="mb-[2.0625rem]"
              />

            </div>
          </FadeIn>
        </Container>
      </Section>

      {/* ── Support Mission ── shared component (same as home page), matches Webflow .support-mission-component */}
      <SupportMissionSection sectionId="careers-support-mission-section" />

    </main>
  );
}
