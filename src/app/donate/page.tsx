import type { Metadata } from 'next';
import { GreenHero } from '@/components/layout';
import { CTASection, DonateInfoSection, DonateVerseSection } from '@/components/sections';
import donateContent from '@/content/donate.json';

export const metadata: Metadata = {
  title: donateContent.meta.title,
  description: donateContent.meta.description,
  openGraph: {
    title: donateContent.meta.og_title,
    description: donateContent.meta.og_description,
  },
};

export default function DonatePage() {
  const { hero, info, payment_form, other_methods } = donateContent.sections;

  return (
    <main className="min-h-screen bg-white">
      <GreenHero
        id="donate-hero-section"
        title={hero.headline}
      />

      <DonateVerseSection
        id="donate-verse-section"
        arabic={hero.arabic_verse}
        translation={hero.verse_translation}
        reference={hero.verse_reference}
      />

      <DonateInfoSection
        id="donate-info-section"
        subheadline={info.subheadline}
        body={info.body}
        finance_email={info.finance_email}
        charity_note={info.charity_note}
        comments_note={info.comments_note}
        methods={other_methods.methods}
        paymentForm={payment_form}
      />

      <CTASection
        heading="Join Our Community"
        body="Together, we're building a brighter future for our children and the community."
        primaryCta={{ label: 'Enroll now', href: '/admissions' }}
      />
    </main>
  );
}
