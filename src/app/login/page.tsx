import { Suspense } from 'react';
import type { Metadata } from 'next';
import Image from 'next/image';
import { LoginForm } from '@/components/admin/LoginForm';
import sharedData from '@/content/_shared.json';

export const metadata: Metadata = {
  title: 'Admin Sign In | Al-Hayaat School',
  robots: { index: false, follow: false },
};

export default function LoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-brand-off-white-background px-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="mb-8 flex flex-col items-center gap-3 text-center">
          <Image
            src={sharedData.nav.logo.src}
            alt={sharedData.nav.logo.alt}
            width={64}
            height={64}
            className="h-16 w-16 object-contain"
            priority
          />
          <div>
            <h1 className="text-2xl font-semibold tracking-[0.04em] text-brand-black">
              Al-Hayaat School
            </h1>
            <p className="mt-1 text-sm text-brand-black/60">Admin portal sign in</p>
          </div>
        </div>

        {/* Card */}
        <div className="rounded-2xl border border-black/10 bg-white p-8 shadow-sm">
          <h2 className="mb-6 text-xl font-semibold text-brand-black">Sign in</h2>
          <Suspense>
            <LoginForm />
          </Suspense>
        </div>

        <p className="mt-6 text-center text-xs text-brand-black/40">
          Al-Hayaat School — Admin access only
        </p>
      </div>
    </main>
  );
}
