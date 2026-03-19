import Image from 'next/image';
import { Container, GreenHero, Section } from '@/components/layout';
import { FadeIn, homeWhyIcons } from '@/components/ui';
import { AboutHeroCarouselSection, AboutMissionVisionSection, CTASection, PageIntroSection, WhySection } from '@/components/sections';
import type { WhySectionCard } from '@/components/sections';
import aboutContent from '@/content/about.json';
type TeamMember = {
  id: string;
  name: string;
  role: string;
  bio: string;
  image?: { src: string; alt: string };
};

const WHY_ICONS = homeWhyIcons;

export const metadata = {
  title: aboutContent.meta.title,
  description: aboutContent.meta.description,
};

export default function AboutPage() {
  const { hero, team, why, office, cta } = aboutContent.sections;

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

      <Section id="about-team-section" background="white" padding="none">
        <Container maxWidth="7xl" className="py-20">
          <FadeIn>
            <div className="mb-16">
              <h2 className="font-heading text-[1.5rem] font-semibold leading-[1.2] md:text-[3rem] lg:text-[2rem] text-brand-black">{team.heading}</h2>
            </div>
          </FadeIn>
          <div id="about-team-container" className="mb-16 grid gap-12">
            {(team.members as TeamMember[]).map((member, index) => (
              <FadeIn key={member.id} delay={index * 100}>
                <article id={`team-member-${member.id}`} className="flex gap-11">
                  <div className="hidden h-[17.875rem] w-[17.875rem] shrink-0 overflow-hidden rounded-xl">
                    {member.image ? (
                      <Image
                        src={member.image.src}
                        alt={member.image.alt}
                        width={286}
                        height={286}
                        className="h-full w-full object-cover"
                      />
                    ) : null}
                  </div>
                  <div>
                    <div className="mb-[0.625rem]">
                      <h4 className="text-brand-black">{member.name}</h4>
                      <div className="text-[1rem]">{member.role}</div>
                    </div>
                    <p className="text-[1rem] leading-[1.5] text-brand-black/80">{member.bio}</p>
                  </div>
                </article>
              </FadeIn>
            ))}
          </div>
          {team.boardImage ? (
            <FadeIn delay={300}>
              <div id="team-board-image-container" className="mx-auto w-full max-w-[42.6875rem] text-center">
                <div className="mb-4">
                  <Image
                    src={team.boardImage.src}
                    alt={team.boardImage.alt}
                    width={684}
                    height={460}
                    className="h-auto w-full"
                  />
                </div>
                <p className="text-sm text-brand-black/80">{team.boardCaption}</p>
              </div>
            </FadeIn>
          ) : null}
        </Container>
      </Section>

      <WhySection
        id="about-why-section"
        heading={why.heading}
        intro={why.intro}
        cards={why.cards as WhySectionCard[]}
        icons={WHY_ICONS}
        cardsClassName="flex flex-col gap-[2.375rem] pb-20"
      />

      <Section background="white" padding="lg" className="hidden">
        <Container maxWidth="7xl">
          <FadeIn>
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-brand-black">{office.heading}</h2>
              <p className="mt-4 text-lg font-medium text-brand-blue">{office.address}</p>
              <p className="mt-4 text-lg leading-relaxed text-brand-black/70">{office.description}</p>
            </div>
          </FadeIn>
        </Container>
      </Section>

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
