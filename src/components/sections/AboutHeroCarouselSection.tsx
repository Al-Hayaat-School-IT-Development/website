import { Container } from '@/components/layout';
import { AutoScrollCarousel, FadeIn } from '@/components/ui';
import type { AutoScrollCarouselImage } from '@/components/ui/AutoScrollCarousel';

export interface AboutHeroCarouselSectionProps {
  id?: string;
  images: AutoScrollCarouselImage[];
  className?: string;
}

export function AboutHeroCarouselSection({ id, images, className }: Readonly<AboutHeroCarouselSectionProps>) {
  return (
    <section
      id={id}
      className={`overflow-hidden bg-brand-off-white-background${className ? ` ${className}` : ''}`}
    >
      <Container maxWidth="7xl" className="py-[4.375rem]">
        <FadeIn>
          <div id="about-hero-carousel">
            <AutoScrollCarousel images={images} fadeColor="from-[#fffcf9]" />
          </div>
        </FadeIn>
      </Container>
    </section>
  );
}
