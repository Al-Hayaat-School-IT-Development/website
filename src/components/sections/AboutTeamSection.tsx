import Image from 'next/image';
import { Container, Section } from '@/components/layout';
import { FadeIn } from '@/components/ui';

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  image?: { src: string; alt: string };
}

export interface AboutTeamSectionProps {
  id?: string;
  heading: string;
  members: TeamMember[];
  boardImage?: { src: string; alt: string };
  boardCaption?: string;
  className?: string;
}

export function AboutTeamSection({
  id,
  heading,
  members,
  boardImage,
  boardCaption,
  className,
}: Readonly<AboutTeamSectionProps>) {
  return (
    <Section id={id} background="white" padding="none" className={className}>
      <Container maxWidth="7xl" className="py-20">
        <FadeIn>
          <div className="mb-16">
            <h2 className="font-heading text-[1.5rem] font-semibold leading-[1.2] md:text-[3rem] lg:text-[2rem] text-brand-black">{heading}</h2>
          </div>
        </FadeIn>
        <div id="about-team-container" className="mb-16 grid gap-12">
          {members.map((member, index) => (
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
                  <div className="space-y-4 text-[1rem] leading-[1.5] text-brand-black/80">
                    {member.bio
                      .split(/\n\n+/)
                      .map((paragraph) => paragraph.trim())
                      .filter(Boolean)
                      .map((paragraph, i) => (
                        <p key={i}>{paragraph}</p>
                      ))}
                  </div>
                </div>
              </article>
            </FadeIn>
          ))}
        </div>
        {boardImage ? (
          <FadeIn delay={300}>
            <div id="team-board-image-container" className="mx-auto w-full max-w-[42.6875rem] text-center">
              <div className="mb-4">
                <Image
                  src={boardImage.src}
                  alt={boardImage.alt}
                  width={684}
                  height={460}
                  className="h-auto w-full"
                />
              </div>
              {boardCaption ? (
                <p className="text-sm text-brand-black/80">{boardCaption}</p>
              ) : null}
            </div>
          </FadeIn>
        ) : null}
      </Container>
    </Section>
  );
}
