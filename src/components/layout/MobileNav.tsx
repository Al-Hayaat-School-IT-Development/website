'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import sharedData from '@/content/_shared.json';
import { isNavPathActive } from '@/lib/navigation';

export function MobileNav() {
  const pathname = usePathname();
  const { links, cta, logo } = sharedData.nav;
  const ctaActive = isNavPathActive(pathname, cta.href);

  return (
    <Sheet>
      <SheetTrigger
        render={
          <Button
            variant="ghost"
            size="icon-sm"
            className="relative border-none bg-transparent text-brand-black shadow-none hover:bg-black/5 md:hidden"
            aria-label="Open navigation menu"
          />
        }
      >
        <span className="flex h-5 w-5 flex-col justify-between">
          <span className="block h-0.5 rounded-full bg-current" />
          <span className="block h-0.5 rounded-full bg-current" />
          <span className="block h-0.5 rounded-full bg-current" />
        </span>
      </SheetTrigger>
      <SheetContent side="left" className="w-72 border-r-0 bg-white p-0 text-brand-black">
        <SheetHeader className="border-b border-black/10 px-6 py-5">
          <SheetTitle className="text-left">
            <Link href={logo.href} className="flex min-h-12 items-stretch gap-3">
              <Image
                src={logo.src}
                alt={logo.alt}
                width={48}
                height={48}
                className="h-12 w-12 shrink-0 self-center object-contain"
              />
              <span className="flex flex-1 items-center text-2xl font-semibold leading-snug tracking-[0.04em] text-brand-black">
                {logo.text}
              </span>
            </Link>
          </SheetTitle>
        </SheetHeader>
        <nav className="flex flex-col gap-2 px-4 py-6" aria-label="Mobile navigation">
          {links.map((link) => {
            const isActive = isNavPathActive(pathname, link.href);
            return (
              <Link
                key={link.id}
                href={link.href}
                className={cn(
                  'rounded-xl px-4 py-3 text-base transition-colors',
                  isActive
                    ? 'bg-brand-yellow text-brand-black'
                    : 'text-brand-black/70 hover:bg-black/5 hover:text-brand-blue',
                )}
              >
                {link.label}
              </Link>
            );
          })}
          <div className="mt-4 px-4">
            <Button
              render={<Link href={cta.href} />}
              variant="default"
              className={cn('w-full', ctaActive && 'ring-2 ring-brand-blue/50')}
            >
              {cta.label}
            </Button>
          </div>
        </nav>
      </SheetContent>
    </Sheet>
  );
}
