import { GreenHero } from '@/components/layout';
import { CTASection, CurriculumContentSection, CurriculumGrowthSection, PageIntroSection } from '@/components/sections';
import content from '@/content/curriculum.json';

export const metadata = {
  title: 'Academic and Curriculum Focus | Al-Hayaat School',
  description:
    'Comprehensive education integrating Ontario standards with teachings. Language arts, Quranic education, mathematics, science, Arabic & more.',
};

export default function CurriculumPage() {
  return (
    <>
      <GreenHero
        id="curriculum-hero-section"
        title={content.hero.title}
      />

      <PageIntroSection
        id="curriculum-intro-section"
        headline={content.intro.heading}
        body={content.intro.body}
      />

      <CurriculumContentSection
        id="curriculum-content-section"
        subtext={content.intro.subtext}
        subjects={content.subjects}
        carousel={content.carousel}
      />

      <CurriculumGrowthSection
        id="curriculum-growth-section"
        heading={content.educators.heading}
        body1={content.educators.body1}
        body2={content.educators.body2}
        image={content.educators.image}
      />

      {/* ── CTA ──────────────────────────────────────────────────────── */}
      <CTASection
        heading={content.cta.heading}
        body={content.cta.body}
        primaryCta={content.cta.primaryCta}
      />
    </>
  );
}
