'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { MobileNav } from './MobileNav';
import sharedData from '@/content/_shared.json';
import { cn } from '@/lib/utils';
import { isNavPathActive } from '@/lib/navigation';

export function Navigation() {
  const pathname = usePathname();
  const { links, cta, logo } = sharedData.nav;
  const ctaActive = isNavPathActive(pathname, cta.href);

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-black/10 shadow-sm text-brand-black">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex min-h-20 items-center justify-between gap-4 py-3">
          <Link href={logo.href} className="flex items-center gap-3 shrink-0">
            <Image
              src={logo.src}
              alt={logo.alt}
              width={56}
              height={56}
              className="h-14 w-14 object-contain"
              priority
            />
            <span className="hidden text-lg font-semibold tracking-[0.04em] text-brand-black sm:block">
              {logo.text}
            </span>
          </Link>

          <nav className="hidden items-center gap-3 md:flex" aria-label="Primary navigation">
            {links.map((link) => (
              <NavLink
                key={link.id}
                href={link.href}
                label={link.label}
                isActive={isNavPathActive(pathname, link.href)}
              />
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <Button
              render={<Link href={cta.href} />}
              variant="default"
              size="sm"
              className={cn('hidden md:inline-flex', ctaActive && 'ring-2 ring-brand-blue/50')}
            >
              {cta.label}
            </Button>
            <MobileNav />
          </div>
        </div>
      </div>
    </header>
  );
}

function NavLink({ href, label, isActive }: Readonly<{ href: string; label: string; isActive: boolean }>) {
  return (
    <Link
      href={href}
      className={cn(
        'rounded-full px-3 py-2 text-lg transition-all duration-300',
        isActive ? 'font-medium text-brand-blue' : 'text-brand-black/75 hover:text-brand-blue',
      )}
    >
      {label}
    </Link>
  );
}
