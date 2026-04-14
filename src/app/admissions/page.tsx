import type { Metadata } from 'next';
import { GreenHero } from '@/components/layout';
import {
  AdmissionsBannerSection,
  AdmissionsEnrollmentCardsSection,
  AdmissionsHowToApplySection,
  AdmissionsRequirementsSection,
  AdmissionsFeesTableSection,
  AdmissionsWhyChooseSection,
  CTASection,
} from '@/components/sections';
import admissionsContent from '@/content/admissions.json';

export const metadata: Metadata = {
  title: admissionsContent.meta.title,
  description: admissionsContent.meta.description,
};

export default function AdmissionsPage() {
  const { hero, enrollment, why_choose, how_to_apply, requirements, fees, cta } =
    admissionsContent;

  return (
    <main className="min-h-screen bg-white">
      <GreenHero
        id="admissions-hero-section"
        title={hero.headline}
      />

      <AdmissionsBannerSection image={admissionsContent.banner} />

      <AdmissionsEnrollmentCardsSection
        heading={enrollment.heading}
        cards={enrollment.cards}
      />

      <AdmissionsWhyChooseSection
        heading={why_choose.heading}
        cards={why_choose.cards}
      />

      <AdmissionsHowToApplySection
        heading={how_to_apply.heading}
        intro={how_to_apply.intro}
        steps={how_to_apply.steps}
      />

      <AdmissionsRequirementsSection
        heading={requirements.heading}
        intro={requirements.intro}
        forms={requirements.forms}
        documents={requirements.documents}
        fees={requirements.fees}
      />

      <AdmissionsFeesTableSection
        heading={fees.heading}
        academicYear={fees.academic_year}
        items={fees.items}
      />

      <CTASection heading={cta.heading} body={cta.body} primaryCta={cta.primaryCta} />
    </main>
  );
}
