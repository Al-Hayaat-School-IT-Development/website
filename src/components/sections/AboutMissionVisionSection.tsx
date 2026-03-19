import { Container, Section } from '@/components/layout';
import { FadeIn, TabsPanel } from '@/components/ui';

export interface AboutMissionVisionSectionProps {
  id?: string;
  heading: string;
  tabs: { id: string; label: string; text: string }[];
  className?: string;
}

export function AboutMissionVisionSection({ id, heading, tabs, className }: AboutMissionVisionSectionProps) {
  const mappedTabs = tabs.map((tab) => ({
    id: tab.id,
    label: tab.label,
    content: <p>{tab.text}</p>,
  }));

  return (
    <Section id={id} background="off-white-bg" padding="none" className={className}>
      <Container maxWidth="7xl" className="py-16">
        <FadeIn>
          <div id="mission-vision-header-wrap" className="mb-[2.0625rem] md:pl-64">
            <h3 className="font-heading text-[1.5rem] font-semibold leading-[1.2] md:text-[3rem] lg:text-[2rem] text-brand-black">{heading}</h3>
          </div>
        </FadeIn>
        <FadeIn delay={80}>
          <div id="mission-vision-tabs-component">
            <TabsPanel tabs={mappedTabs} defaultTab={mappedTabs[0]?.id} orientation="vertical" variant="webflow" />
          </div>
        </FadeIn>
      </Container>
    </Section>
  );
}
