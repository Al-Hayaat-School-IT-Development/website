import { cn } from '@/lib/utils';
import { Container } from './Container';
import { FadeIn } from '@/components/ui/FadeIn';

export interface PageHeroProps {
  readonly title: string;
  readonly subtitle?: string;
  readonly id?: string;
  readonly className?: string;
}

export function PageHero({ title, subtitle, id, className }: Readonly<PageHeroProps>) {
  return (
    <section
      id={id}
      className={cn('bg-brand-off-white-background', className)}
    >
      <Container maxWidth="7xl" className="pb-[4.375rem] pt-[4.375rem]">
        <FadeIn>
          <div className="mx-auto max-w-[48.5625rem] text-center">
            <h1 className="text-brand-black">{title}</h1>
            {subtitle && (
              <p className="mt-5 text-[1.2rem] font-medium leading-[1.3] text-brand-black/80">
                {subtitle}
              </p>
            )}
          </div>
        </FadeIn>
      </Container>
    </section>
  );
}
