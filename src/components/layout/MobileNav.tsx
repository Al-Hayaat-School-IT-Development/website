'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu } from 'lucide-react';
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
            size="icon"
            className="md:hidden text-white hover:bg-white/10"
            aria-label="Open navigation menu"
          />
        }
      >
        <Menu className="h-6 w-6" />
      </SheetTrigger>
      <SheetContent side="left" className="w-72 bg-[#1e3a5f] text-white border-r-0 p-0">
        <SheetHeader className="px-6 py-5 border-b border-white/10">
          <SheetTitle className="text-white text-left text-lg font-bold tracking-wide">
            {logo.text}
          </SheetTitle>
        </SheetHeader>
        <nav className="flex flex-col px-4 py-6 gap-1" aria-label="Mobile navigation">
          {links.map((link: NavLink) => {
            const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
            return (
              <Link
                key={link.id}
                href={link.href}
                className={cn(
                  'px-4 py-3 rounded-lg text-sm font-medium transition-colors',
                  isActive
                    ? 'bg-[#c9a84c] text-[#1e3a5f]'
                    : 'text-white/80 hover:bg-white/10 hover:text-white'
                )}
              >
                {link.label}
              </Link>
            );
          })}
          <div className="mt-4 px-4">
            <Link
              href={cta.href}
              className="block w-full text-center bg-[#c9a84c] text-[#1e3a5f] font-semibold px-4 py-3 rounded-lg text-sm hover:bg-[#b8963e] transition-colors"
            >
              {cta.label}
            </Link>
          </div>
        </nav>
      </SheetContent>
    </Sheet>
  );
}
