import Image from 'next/image';
import { cn } from '@/lib/utils';

export interface GreenHeroProps {
  readonly title: string;
  readonly subtitle?: string;
  readonly id?: string;
  readonly className?: string;
}

export function GreenHero({ title, subtitle, id, className }: GreenHeroProps) {
  return (
    <section
      id={id}
      className={cn(
        'relative flex h-[20rem] items-center overflow-hidden bg-brand-green text-white',
        className,
      )}
    >
      <Image
        src="/images/cta-bg.webp"
        alt=""
        fill
        className="object-cover object-center"
        aria-hidden="true"
        priority
      />
      <div className="relative z-10 w-full px-4 sm:px-6 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-[25rem] xl:mx-auto">
            <h1 className="font-display text-[5rem] font-normal leading-[0.7] text-white xl:flex xl:justify-center">
              {title}
            </h1>
          </div>
          {subtitle && (
            <div className="mt-4 max-w-[25rem] xl:mx-auto">
              <p className="font-sans text-[1rem] text-white/90 xl:text-center">{subtitle}</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
