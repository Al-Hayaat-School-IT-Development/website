import { Mail, MapPin, Phone } from 'lucide-react';
import { Container, Section } from '@/components/layout';
import { ColoredBorderCard, FadeIn } from '@/components/ui';
import ContactForm from '@/app/contact/ContactForm';

export interface ContactInfoData {
  email_general: string;
  email_admin: string;
  phone: string;
  address: string;
}

export interface ContactInfoSectionProps {
  id?: string;
  contactInfo: ContactInfoData;
  className?: string;
}

export function ContactInfoSection({
  id,
  contactInfo,
  className,
}: Readonly<ContactInfoSectionProps>) {
  return (
    <Section id={id} background="white" padding="lg" className={className}>
      <Container maxWidth="7xl">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-start">
          <FadeIn>
            <div className="space-y-5">
              <ColoredBorderCard accent="blue" className="rounded-[1.5rem] bg-brand-off-white">
                <div className="flex items-start gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white">
                    <Mail className="h-5 w-5 text-brand-blue" />
                  </div>
                  <div>
                    <h3 className="text-[1.8rem] text-brand-black">Email</h3>
                    <div className="mt-3 space-y-2 text-base leading-relaxed text-brand-black/75">
                      <p>
                        <a href={`mailto:${contactInfo.email_general}`} className="font-medium text-brand-blue hover:underline">
                          {contactInfo.email_general}
                        </a>
                      </p>
                      <p>
                        <a href={`mailto:${contactInfo.email_admin}`} className="font-medium text-brand-blue hover:underline">
                          {contactInfo.email_admin}
                        </a>
                      </p>
                    </div>
                  </div>
                </div>
              </ColoredBorderCard>

              <ColoredBorderCard accent="yellow" className="rounded-[1.5rem] bg-white">
                <div className="flex items-start gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brand-off-white">
                    <Phone className="h-5 w-5 text-brand-blue" />
                  </div>
                  <div>
                    <h3 className="text-[1.8rem] text-brand-black">Phone</h3>
                    <p className="mt-3 text-base leading-relaxed text-brand-black/75">
                      <a href={`tel:${contactInfo.phone.replaceAll(/[^0-9+]/g, '')}`} className="font-medium text-brand-blue hover:underline">
                        {contactInfo.phone}
                      </a>
                    </p>
                  </div>
                </div>
              </ColoredBorderCard>

              <ColoredBorderCard accent="orange" className="rounded-[1.5rem] bg-white">
                <div className="flex items-start gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brand-off-white">
                    <MapPin className="h-5 w-5 text-brand-blue" />
                  </div>
                  <div>
                    <h3 className="text-[1.8rem] text-brand-black">Address</h3>
                    <p className="mt-3 text-base leading-relaxed text-brand-black/75">
                      {contactInfo.address}
                    </p>
                  </div>
                </div>
              </ColoredBorderCard>
            </div>
          </FadeIn>

          <FadeIn delay={120}>
            <ContactForm />
          </FadeIn>
        </div>
      </Container>
    </Section>
  );
}
