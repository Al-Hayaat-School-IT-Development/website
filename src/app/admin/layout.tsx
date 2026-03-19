import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { LogOut, LayoutDashboard, HandCoins, Mail, Briefcase, Users } from 'lucide-react';

export const metadata: Metadata = {
  title: { default: 'Admin — Al-Hayaat School', template: '%s | Admin — Al-Hayaat School' },
  robots: { index: false, follow: false },
};

const NAV_ITEMS = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard, exact: true },
  { href: '/admin/donations', label: 'Donations', icon: HandCoins },
  { href: '/admin/contacts', label: 'Contacts', icon: Mail },
  { href: '/admin/applications', label: 'Applications', icon: Briefcase },
  { href: '/admin/subscribers', label: 'Subscribers', icon: Users },
];

export default function AdminLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="hidden w-60 shrink-0 flex-col border-r border-gray-200 bg-white lg:flex">
        <div className="flex h-16 items-center gap-2.5 border-b border-gray-200 px-5">
          <Image
            src="/images/logo.png"
            alt="Al-Hayaat School"
            width={32}
            height={32}
            className="h-8 w-8 object-contain"
          />
          <span className="text-sm font-semibold text-gray-900">Admin Portal</span>
        </div>
        <nav className="flex flex-1 flex-col gap-0.5 p-3" aria-label="Admin navigation">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-gray-700 transition-colors hover:bg-gray-100 hover:text-gray-900"
            >
              <item.icon className="size-4 shrink-0 text-gray-500" />
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="border-t border-gray-200 p-3">
          <form action="/api/auth/signout" method="POST">
            <button
              type="submit"
              className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-gray-600 transition-colors hover:bg-red-50 hover:text-red-700"
            >
              <LogOut className="size-4 shrink-0" />
              Sign out
            </button>
          </form>
        </div>
      </aside>

      {/* Main */}
      <div className="flex flex-1 flex-col">
        {/* Mobile top bar */}
        <header className="flex h-14 items-center justify-between border-b border-gray-200 bg-white px-4 lg:hidden">
          <span className="text-sm font-semibold text-gray-900">Admin Portal</span>
          <form action="/api/auth/signout" method="POST">
            <button type="submit" className="text-sm text-gray-500 hover:text-red-600">
              Sign out
            </button>
          </form>
        </header>
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}
