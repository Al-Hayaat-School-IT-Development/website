import Image from 'next/image';
import Link from 'next/link';
import { Mail, Phone, Facebook, Instagram, Youtube, Twitter } from 'lucide-react';
import { FooterNewsletter } from './FooterNewsletter';
import sharedData from '@/content/_shared.json';

const SOCIAL_ICONS = {
  Facebook: Facebook,
  Instagram: Instagram,
  Youtube: Youtube,
  Twitter: Twitter,
} as const;

type SocialPlatform = keyof typeof SOCIAL_ICONS;

export function Footer() {
  const { tagline, address, phone, email, social, quick_links, copyright, legal_links } =
    sharedData.footer;
  const { logo } = sharedData.nav;

  return (
    <footer className="bg-[#1e3a5f] text-white" aria-label="Site footer">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Column 1 — School info */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-3 mb-4">
              <Image
                src={logo.src}
                alt={logo.alt}
                width={44}
                height={44}
                className="rounded-sm"
              />
              <span className="font-bold text-lg">{logo.text}</span>
            </Link>
            <p className="text-sm text-white/70 leading-relaxed mb-5">{tagline}</p>

            {/* Social links */}
            <div className="flex items-center gap-3">
              {social.map((item) => {
                const Icon = SOCIAL_ICONS[item.platform as SocialPlatform];
                if (!Icon) return null;
                return (
                  <a
                    key={item.id}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={item.platform}
                    className="w-9 h-9 flex items-center justify-center rounded-full bg-white/10 hover:bg-[#c9a84c] hover:text-[#1e3a5f] transition-colors"
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Column 2 — Quick links */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-[#c9a84c] mb-4">
              Menu
            </h3>
            <ul className="space-y-2">
              {quick_links.map((link) => (
                <li key={link.id}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/70 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 — Contact */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-[#c9a84c] mb-4">
              Contact
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-sm text-white/70">
                <Mail className="w-4 h-4 mt-0.5 shrink-0 text-white/50" />
                <a
                  href={`mailto:${email}`}
                  className="hover:text-white transition-colors break-all"
                >
                  {email}
                </a>
              </li>
              <li className="flex items-center gap-2 text-sm text-white/70">
                <Phone className="w-4 h-4 shrink-0 text-white/50" />
                <a href={`tel:${phone}`} className="hover:text-white transition-colors">
                  {phone}
                </a>
              </li>
              <li className="text-sm text-white/70 leading-relaxed">{address}</li>
            </ul>
          </div>

          {/* Column 4 — Newsletter */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-[#c9a84c] mb-4">
              Newsletter
            </h3>
            <FooterNewsletter />
          </div>
        </div>
      </div>

      {/* Footer bottom bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-sm text-white/50">{copyright}</p>
          <div className="flex items-center gap-4">
            {legal_links.map((link) => (
              <Link
                key={link.id}
                href={link.href}
                className="text-sm text-white/50 hover:text-white transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
