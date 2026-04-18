import Image from 'next/image';
import { cn } from '@/lib/utils';

export interface GreenHeroProps {
  readonly title: string;
  readonly id?: string;
  readonly className?: string;
}

export function GreenHero({ title, id, className }: GreenHeroProps) {
  return (
    <section
      id={id}
      className={cn(
        'relative flex h-[20rem] items-center overflow-hidden bg-brand-green text-white',
        className,
      )}
    >
      <Image
        src="/images/shared/backgrounds/cta-bg.webp"
        alt=""
        fill
        className="object-cover object-center"
        aria-hidden="true"
        priority
      />
      <div className="relative z-10 w-full px-4 sm:px-6 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="flex justify-center">
            <h1 className="font-display text-[5rem] font-normal leading-[0.7] text-center text-white">
              {title}
            </h1>
          </div>
        </div>
      </div>
    </section>
  );
}
