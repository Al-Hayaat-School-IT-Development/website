import { GreenHero } from '@/components/layout';
import { CTASection, PageIntroSection, SchoolPlanCardsSection, SupportMissionSection } from '@/components/sections';
import content from '@/content/school-plan.json';

export const metadata = {
  title: 'School Plans | Al-Hayaat School',
  description:
    'Al-Hayaat School is set to open its doors in September 2026, offering a faith-based, high-quality education for the Kitchener-Waterloo community.',
};

export default function SchoolPlanPage() {
  const openingItems = [
    ...content.openingPlan.phases.map((phase) => `${phase.trigger}: ${phase.content}`),
    content.openingPlan.note,
  ];

  return (
    <>
      <GreenHero
        id="school-plan-hero-section"
        title={content.hero.title}
      />

      <PageIntroSection
        id="school-plan-intro-section"
        headline={content.intro.heading}
        body={content.intro.body}
      />

      <SchoolPlanCardsSection
        id="school-plans-cards-section"
        cards={[
          {
            type: 'checklist',
            accent: 'yellow',
            className: 'bg-brand-off-white',
            heading: content.openingPlan.heading,
            items: openingItems,
          },
          {
            type: 'body',
            accent: 'blue',
            className: 'bg-white shadow-sm',
            heading: content.community.heading,
            body: content.community.body,
            cta: content.community.cta,
          },
        ]}
      />

      {/* Support Our Mission — uses shared component with blue background matching Webflow .support-mission-component */}
      <SupportMissionSection
        sectionId="school-plan-support-mission-section"
        contentOverride={{
          heading: content.mission.heading,
          points: content.mission.points,
          cta: content.mission.cta,
        }}
      />

      <CTASection
        id="school-plan-cta-section"
        heading={content.cta.heading}
        body={content.cta.body}
        primaryCta={content.cta.primaryCta}
      />
    </>
  );
}
