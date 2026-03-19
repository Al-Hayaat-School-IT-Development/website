import type { Metadata } from 'next';
import { GreenHero } from '@/components/layout';
import { CTASection, ContactInfoSection, PageIntroSection } from '@/components/sections';
import contactContent from '@/content/contact.json';

export const metadata: Metadata = {
  title: contactContent.meta.title,
  description: contactContent.meta.description,
};

export default function ContactPage() {
  const { hero, contact_info, cta } = contactContent;

  return (
    <main className="min-h-screen bg-white">
      <GreenHero
        id="contact-hero-section"
        title={hero.heading}
      />

      <PageIntroSection
        id="contact-intro-section"
        headline={hero.intro_heading}
        body={hero.subtext}
      />

      <ContactInfoSection
        id="contact-info-section"
        contactInfo={contact_info}
      />

      <CTASection heading={cta.heading} body={cta.body} primaryCta={cta.primaryCta} />
    </main>
  );
}
