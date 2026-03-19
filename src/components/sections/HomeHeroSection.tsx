import Image from 'next/image';
import Link from 'next/link';
import { Container } from '@/components/layout';
import { FadeIn } from '@/components/ui';
import { Button } from '@/components/ui/button';

export interface HomeHeroSectionProps {
  headline: string;
  subtext: string;
  cta: { label: string; href: string };
  background: {
    glitter: string;
    dashlines: string;
    dots: string;
  };
  className?: string;
}

export function HomeHeroSection({ headline, subtext, cta, background, className }: HomeHeroSectionProps) {
  return (
    <section
      id="home-hero-section"
      className={`relative overflow-hidden bg-white${className ? ` ${className}` : ''}`}
    >
      <div className="absolute inset-0">
        <Image
          src={background.glitter}
          alt=""
          fill
          priority
          className="object-cover"
          aria-hidden="true"
        />
      </div>
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-48 sm:h-64">
        <Image
          src={background.dashlines}
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-bottom opacity-20"
          aria-hidden="true"
        />
      </div>
      <div className="pointer-events-none absolute bottom-0 right-0 z-10 hidden lg:block">
        <Image
          src={background.dots}
          alt=""
          width={253}
          height={130}
          className="opacity-30"
          aria-hidden="true"
        />
      </div>

      <Container maxWidth="7xl" className="relative z-20 pt-[10rem] pb-[16rem]">
        <FadeIn>
          <div id="home-hero-content" className="mx-auto max-w-4xl text-center">
            <h1 className="text-brand-black">{headline}</h1>
            <p className="mt-5 text-xl font-medium text-brand-black/75 sm:text-2xl">{subtext}</p>
            <div className="mt-8 flex justify-center">
              <Button render={<Link href={cta.href} />} size="lg">
                {cta.label}
              </Button>
            </div>
          </div>
        </FadeIn>
      </Container>
    </section>
  );
}
