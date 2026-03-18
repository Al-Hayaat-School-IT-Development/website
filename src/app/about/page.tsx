import Image from 'next/image';
import Link from 'next/link';
import { Container, Section } from '@/components/layout';
import { AutoScrollCarousel, CTASection, FadeIn, TabsPanel, WhyCard, homeWhyIcons } from '@/components/ui';
import { Button } from '@/components/ui/button';
import aboutContent from '@/content/about.json';

type WhyCardItem = { id: string; title: string; description: string };
type MissionTab = { id: string; label: string; text: string };
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
  const { hero, missionVision, team, why, office, cta } = aboutContent.sections;
  const missionTabs = (missionVision.tabs as MissionTab[]).map((tab) => ({
    id: tab.id,
    label: tab.label,
    content: <p>{tab.text}</p>,
  }));

  return (
    <>
      <section className="overflow-hidden bg-brand-off-white-background">
        <Container maxWidth="7xl" className="pb-[4.375rem] pt-[4.375rem]">
          <div className="relative pb-32">
            <FadeIn>
              <div className="mx-auto max-w-[48.5625rem] text-center">
                <div className="mb-5">
                  <h1 className="text-brand-black">{hero.headline}</h1>
                </div>
                <div className="mb-11">
                  <p className="text-[1.2rem] font-medium leading-[1.3] text-brand-black/80">{hero.subtext}</p>
                </div>
                <div className="flex justify-center">
                  <Button render={<Link href={hero.cta.href} />}>{hero.cta.label}</Button>
                </div>
              </div>
            </FadeIn>
            <div className="pointer-events-none absolute bottom-4 left-0 hidden lg:block">
              <Image src={hero.decor.shapeOne} alt="" width={150} height={150} aria-hidden="true" />
            </div>
            <div className="pointer-events-none absolute bottom-0 right-0 hidden lg:block">
                <Image src={hero.decor.shapeTwo} alt="" width={96} height={74} aria-hidden="true" />
            </div>
          </div>
          <FadeIn delay={80}>
            <AutoScrollCarousel images={hero.carousel} />
          </FadeIn>
        </Container>
      </section>

      <Section background="gray" padding="none">
        <Container maxWidth="7xl" className="py-16">
          <FadeIn>
            <div className="mb-[2.0625rem] text-center md:pl-64">
              <h3 className="text-brand-black">{missionVision.heading}</h3>
            </div>
          </FadeIn>
          <FadeIn delay={80}>
            <TabsPanel tabs={missionTabs} defaultTab={missionTabs[0]?.id} orientation="vertical" variant="webflow" />
          </FadeIn>
        </Container>
      </Section>

      <Section background="white" padding="none">
        <Container maxWidth="7xl" className="py-20">
          <FadeIn>
            <div className="mb-16 text-center">
              <h2 className="text-brand-black">{team.heading}</h2>
            </div>
          </FadeIn>
          <div className="mb-16 grid gap-12">
            {(team.members as TeamMember[]).map((member, index) => (
              <FadeIn key={member.id} delay={index * 100}>
                <article className="flex gap-11">
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
              <div className="mx-auto w-full max-w-[42.6875rem] text-center">
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

      <Section background="white" padding="none">
        <Container maxWidth="7xl">
          <FadeIn>
            <div className="mx-auto mb-[5.5625rem] max-w-[44.5rem] pt-8 text-center">
              <h2 className="text-brand-black">{why.heading}</h2>
              <p className="mt-4 text-[1.2rem] font-medium leading-[1.3] text-brand-black/80">{why.intro}</p>
            </div>
          </FadeIn>
          <div className="mx-auto flex max-w-[67.375rem] flex-col gap-[2.375rem] pb-20">
            {(why.cards as WhyCardItem[]).map((card, index) => (
              <FadeIn key={card.id} delay={index * 100}>
                <WhyCard
                  icon={WHY_ICONS[index % WHY_ICONS.length]}
                  title={card.title}
                  description={card.description}
                />
              </FadeIn>
            ))}
          </div>
        </Container>
      </Section>

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
        heading={cta.heading}
        body={cta.body}
        primaryCta={cta.cta}
        variant="green"
      />
    </>
  );
}
