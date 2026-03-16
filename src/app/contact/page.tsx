import type { Metadata } from 'next';
import { MapPin, Phone, Mail } from 'lucide-react';
import { Container, Section, Grid, PageHeader } from '@/components/layout';
import { CTASection, FadeIn } from '@/components/ui';
import { Card, CardContent } from '@/components/ui/card';
import ContactForm from './ContactForm';
import contactContent from '@/content/contact.json';
import sharedContent from '@/content/_shared.json';

export const metadata: Metadata = {
  title: contactContent.meta.title,
  description: contactContent.meta.description,
};

export default function ContactPage() {
  const { hero, cta } = contactContent;
  const { phone, address, email } = sharedContent.footer;

  return (
    <main className="min-h-screen bg-white">
      {/* Page Header */}
      <Section background="gray" padding="md">
        <Container>
          <PageHeader
            title={hero.heading}
            subtitle={hero.subtext}
            breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Contact' }]}
          />
        </Container>
      </Section>

      {/* Contact Info + Form */}
      <Section background="white" padding="lg">
        <Container>
          <FadeIn>
            <Grid columns={2} gap="lg" className="items-start">
              {/* Contact Info */}
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-900">Get in Touch</h2>
                <p className="leading-relaxed text-gray-600">
                  We are also reachable at{' '}
                  <a
                    href="mailto:admin@alhayaat.ca"
                    className="font-medium text-primary hover:underline"
                  >
                    admin@alhayaat.ca
                  </a>
                </p>

                <div className="space-y-4">
                  <Card>
                    <CardContent className="flex items-start gap-4 p-6">
                      <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                      <div>
                        <p className="font-medium text-gray-900">Address</p>
                        <p className="text-sm text-gray-600">{address}</p>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="flex items-start gap-4 p-6">
                      <Phone className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                      <div>
                        <p className="font-medium text-gray-900">Phone</p>
                        <a
                          href={`tel:${phone.replace(/-/g, '')}`}
                          className="text-sm text-gray-600 hover:text-primary hover:underline"
                        >
                          {phone}
                        </a>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="flex items-start gap-4 p-6">
                      <Mail className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                      <div>
                        <p className="font-medium text-gray-900">Email</p>
                        <a
                          href={`mailto:${email}`}
                          className="text-sm text-gray-600 hover:text-primary hover:underline"
                        >
                          {email}
                        </a>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Contact Form */}
              <ContactForm />
            </Grid>
          </FadeIn>
        </Container>
      </Section>

      {/* CTA */}
      <CTASection
        heading={cta.heading}
        body={cta.body}
        primaryCta={cta.primary_cta}
      />
    </main>
  );
}
