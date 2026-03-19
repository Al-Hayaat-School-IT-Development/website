import Link from 'next/link';
import { HandCoins, Landmark, Mail, ShieldCheck, Wallet } from 'lucide-react';
import { Container, Section } from '@/components/layout';
import { ColoredBorderCard, FadeIn } from '@/components/ui';
import { Button } from '@/components/ui/button';
import { DonationForm } from '@/components/donate/DonationForm';

export interface DonateMethod {
  id: string;
  title: string;
  body: string;
  email?: string;
}

export interface DonatePaymentFormContent {
  id: string;
  form_headline: string;
  preset_amounts: number[];
  custom_label: string;
  name_label: string;
  email_label: string;
  address_label: string;
  anonymous_label: string;
  submit_label: string;
  processing_label: string;
  stripe_note: string;
}

export interface DonateInfoSectionProps {
  id?: string;
  subheadline: string;
  body: string;
  finance_email: string;
  charity_note: string;
  comments_note: string;
  methods: DonateMethod[];
  paymentForm: DonatePaymentFormContent;
  className?: string;
}

const methodConfig = [
  { accent: 'yellow', icon: <HandCoins className="h-6 w-6 text-brand-black" /> },
  { accent: 'orange', icon: <Mail className="h-6 w-6 text-brand-black" /> },
  { accent: 'blue', icon: <Landmark className="h-6 w-6 text-white" /> },
  { accent: 'green', icon: <ShieldCheck className="h-6 w-6 text-brand-black" /> },
  { accent: 'red', icon: <Wallet className="h-6 w-6 text-white" /> },
] as const;

export function DonateInfoSection({
  id,
  subheadline,
  body,
  finance_email,
  charity_note,
  comments_note,
  methods,
  paymentForm,
  className,
}: DonateInfoSectionProps) {
  return (
    <Section id={id} background="white" padding="lg" className={className}>
      <Container maxWidth="7xl">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]">
          <FadeIn>
            <div>
              <h2 className="text-brand-black">{subheadline}</h2>
              <div className="mt-6 space-y-5 text-lg leading-relaxed text-brand-black/75">
                <p>{body}</p>
                <p>
                  <strong>Khums:</strong> Al-Hayaat School can collect khums to use a portion for
                  the school. Please reach out at{' '}
                  <a href={`mailto:${finance_email}`} className="font-medium text-brand-blue hover:underline">
                    {finance_email}
                  </a>{' '}
                  for further information.
                </p>
                <p>
                  {charity_note} {comments_note}
                </p>
              </div>

              <div className="mt-8 grid gap-4 md:grid-cols-2">
                {methods.map((method, index) => {
                  const config = methodConfig[index];
                  const isCreditCard = method.id === 'donate-method-credit-card';

                  return (
                    <ColoredBorderCard
                      key={method.id}
                      accent={config.accent}
                      className="h-full rounded-[1.5rem] border-0 bg-white"
                      icon={
                        <div
                          className={
                            config.accent === 'blue' || config.accent === 'red'
                              ? 'flex h-10 w-10 items-center justify-center rounded-full bg-brand-blue'
                              : 'flex h-10 w-10 items-center justify-center rounded-full bg-brand-off-white'
                          }
                        >
                          {config.icon}
                        </div>
                      }
                    >
                      <h3 className="text-[2rem] text-brand-black">{method.title}</h3>
                      <p className="text-base leading-relaxed text-brand-black/75">{method.body}</p>
                      {method.email ? (
                        <a href={`mailto:${method.email}`} className="text-sm font-semibold text-brand-blue hover:underline">
                          {method.email}
                        </a>
                      ) : null}
                      {isCreditCard ? (
                        <div className="pt-2">
                          <Button render={<Link href="#donation-form" />} size="sm">
                            Donate
                          </Button>
                        </div>
                      ) : null}
                    </ColoredBorderCard>
                  );
                })}
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={120}>
            <div
              id="donation-form"
              className="rounded-[1.75rem] border border-black/10 bg-white p-7 shadow-xl"
            >
              <h2 className="mb-6 text-[2rem] text-brand-black">{paymentForm.form_headline}</h2>
              <DonationForm
                content={{
                  id: String(paymentForm.id),
                  form_headline: String(paymentForm.form_headline),
                  preset_amounts: paymentForm.preset_amounts,
                  custom_label: String(paymentForm.custom_label),
                  name_label: String(paymentForm.name_label),
                  email_label: String(paymentForm.email_label),
                  address_label: String(paymentForm.address_label),
                  anonymous_label: String(paymentForm.anonymous_label),
                  submit_label: String(paymentForm.submit_label),
                  processing_label: String(paymentForm.processing_label),
                  stripe_note: String(paymentForm.stripe_note),
                }}
              />
            </div>
          </FadeIn>
        </div>
      </Container>
    </Section>
  );
}
