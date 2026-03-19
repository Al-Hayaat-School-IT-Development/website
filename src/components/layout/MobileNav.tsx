'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Heart, Search } from 'lucide-react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import sharedData from '@/content/_shared.json';

type NavLink = (typeof sharedData.nav.links)[number];

export function MobileNav() {
  const pathname = usePathname();
  const { links, cta, logo } = sharedData.nav;

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
            <Link href={logo.href} className="flex items-center gap-3">
              <Image
                src={logo.src}
                alt={logo.alt}
                width={48}
                height={48}
                className="h-12 w-12 object-contain"
              />
              <span className="text-xl font-semibold tracking-[0.04em] text-brand-black">
                {logo.text}
              </span>
            </Link>
          </SheetTitle>
        </SheetHeader>
        <nav className="flex flex-col gap-2 px-4 py-6" aria-label="Mobile navigation">
          {links.map((link: NavLink) => {
            const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
            return (
              <Link
                key={link.id}
                href={link.href}
                className={cn(
                  'rounded-xl px-4 py-3 text-base transition-colors',
                  isActive
                    ? 'bg-brand-yellow text-brand-black'
                    : 'text-brand-black/70 hover:bg-black/5 hover:text-brand-blue'
                )}
              >
                {link.label}
              </Link>
            );
          })}
          <button
            type="button"
            aria-label="Search"
            className="flex items-center gap-3 rounded-xl px-4 py-3 text-base text-brand-black/70 transition-colors hover:bg-black/5 hover:text-brand-blue"
          >
            <Search className="size-5" />
            Search
          </button>
          <div className="mt-4 px-4">
            <Button
              render={<Link href={cta.href} />}
              variant="secondary"
              className="w-full"
            >
              <Heart className="size-4" />
              {cta.label}
            </Button>
          </div>
        </nav>
      </SheetContent>
    </Sheet>
  );
}
