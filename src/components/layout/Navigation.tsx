import Image from 'next/image';
import Link from 'next/link';
import { MobileNav } from './MobileNav';
import sharedData from '@/content/_shared.json';

export function Navigation() {
  const { links, cta, logo } = sharedData.nav;

  return (
    <header className="sticky top-0 z-50 bg-[#1e3a5f] shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href={logo.href} className="flex items-center gap-3 shrink-0">
            <Image
              src={logo.src}
              alt={logo.alt}
              width={44}
              height={44}
              className="rounded-sm"
              priority
            />
            <span className="text-white font-bold text-lg hidden sm:block tracking-wide">
              {logo.text}
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1" aria-label="Primary navigation">
            {links.map((link) => (
              <NavLink key={link.id} href={link.href} label={link.label} />
            ))}
          </nav>

          {/* Desktop CTA + Mobile hamburger */}
          <div className="flex items-center gap-3">
            <Link
              href={cta.href}
              className="hidden md:inline-flex items-center bg-[#c9a84c] text-[#1e3a5f] font-semibold px-5 py-2 rounded-lg text-sm hover:bg-[#b8963e] transition-colors"
            >
              {cta.label}
            </Link>
            <MobileNav />
          </div>
        </div>
      </div>
    </header>
  );
}

// Lightweight RSC-compatible active link — uses JS-free approach on server,
// full active styling handled client-side in MobileNav; desktop uses hover only.
function NavLink({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      className="px-3 py-2 text-sm font-medium text-white/80 hover:text-white hover:bg-white/10 rounded-md transition-colors"
    >
      {label}
    </Link>
  );
}
