import { GreenHero } from '@/components/layout';
import { homeWhyIcons } from '@/components/ui';
import { AboutHeroCarouselSection, AboutMissionVisionSection, AboutTeamSection, CTASection, PageIntroSection, WhySection } from '@/components/sections';
import type { WhySectionCard } from '@/components/sections';
import aboutContent from '@/content/about.json';

const WHY_ICONS = homeWhyIcons;

export const metadata = {
  title: aboutContent.meta.title,
  description: aboutContent.meta.description,
};

export default function AboutPage() {
  const { hero, team, why, cta } = aboutContent.sections;

  return (
    <>
      <GreenHero
        id="about-hero-section"
        title={hero.headline}
      />

      <PageIntroSection
        id="about-intro-section"
        headline={hero.intro_heading}
        body={hero.subtext}
      />

      <AboutHeroCarouselSection
        id="about-hero-carousel-section"
        images={hero.carousel}
      />

      <AboutMissionVisionSection
        id="about-mission-vision-section"
        heading={aboutContent.sections.missionVision.heading}
        tabs={aboutContent.sections.missionVision.tabs}
      />

      <AboutTeamSection
        id="about-team-section"
        heading={team.heading}
        members={team.members}
        boardImage={team.boardImage}
        boardCaption={team.boardCaption}
      />

      <WhySection
        id="about-why-section"
        heading={why.heading}
        intro={why.intro}
        cards={why.cards as WhySectionCard[]}
        icons={WHY_ICONS}
        cardsClassName="flex flex-col gap-[2.375rem] pb-20"
      />

      <CTASection
        id="about-cta-section"
        heading={cta.heading}
        body={cta.body}
        primaryCta={cta.cta}
        variant="green"
      />
    </>
  );
}
