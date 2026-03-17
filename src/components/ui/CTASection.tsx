import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

export interface CTASectionProps {
  heading: string;
  body: string;
  primaryCta: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
  variant?: 'primary' | 'secondary' | 'green';
  className?: string;
}

export function CTASection({
  heading,
  body,
  primaryCta,
  secondaryCta,
  variant = 'green',
  className,
}: CTASectionProps) {
  const isPrimary = variant === 'primary';
  const isGreen = variant === 'green';

  return (
    <section
      className={cn(
        'relative w-full overflow-hidden px-6 py-20',
        isPrimary && 'bg-primary text-primary-foreground',
        isGreen && 'bg-brand-green text-white',
        !isPrimary && !isGreen && 'bg-background text-foreground',
        className,
      )}
    >
      {isGreen && (
        <Image
          src="/images/cta-bg.webp"
          alt=""
          fill
          className="object-cover object-center"
          aria-hidden="true"
          priority={false}
        />
      )}
      <div className="relative z-10 mx-auto flex max-w-4xl flex-col items-center gap-8 text-center">
        <h2 className="text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
          {heading}
        </h2>
        <p
          className={cn(
            'max-w-2xl text-base leading-relaxed',
            isPrimary ? 'text-primary-foreground/80' : 'text-white/80',
          )}
        >
          {body}
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Button
            size="lg"
            variant={isPrimary || isGreen ? 'secondary' : 'default'}
            render={<Link href={primaryCta.href} />}
          >
            {primaryCta.label}
          </Button>
          {secondaryCta && (
            <Button
              size="lg"
              variant="outline"
              render={<Link href={secondaryCta.href} />}
            >
              {secondaryCta.label}
            </Button>
          )}
        </div>
      </div>
    </section>
  );
}
