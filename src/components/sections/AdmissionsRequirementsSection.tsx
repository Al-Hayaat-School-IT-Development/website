import Image from 'next/image';
import Link from 'next/link';
import { Container, Section } from '@/components/layout';
import { FadeIn } from '@/components/ui';
import { CheckCircle2 } from 'lucide-react';
import { registrationFormHref } from '@/lib/registration-forms';

export interface RequirementsForm {
  id: string;
  label: string;
  /** PDF filename under `public/assets/registration/` or Azure/CDN base — see `registrationFormHref`. */
  file: string;
}

export interface RequirementsFees {
  heading: string;
  items: string[];
}

export interface AdmissionsRequirementsSectionProps {
  id?: string;
  heading: string;
  /** Explains manual download / email workflow. */
  intro?: string;
  forms: RequirementsForm[];
  documents: string[];
  fees: RequirementsFees;
  className?: string;
}

export function AdmissionsRequirementsSection({
  id,
  heading,
  intro,
  forms,
  documents,
  fees,
  className,
}: Readonly<AdmissionsRequirementsSectionProps>) {
  return (
    <Section id={id} background="gray" padding="lg" className={className}>
      <Container>
        <FadeIn className="flex w-full max-w-none flex-col">
          <div className="mb-8 w-full max-w-3xl">
            <h2 className="text-brand-black">{heading}</h2>
            {intro ? (
              <p className="mt-4 text-lg leading-relaxed text-brand-black/70">{intro}</p>
            ) : null}
          </div>

          <div className="grid w-full gap-8 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]">
            <div className="grid gap-4 sm:grid-cols-2">
              {forms.map((form, index) => {
                const isFirst = index === 0;
                const href = registrationFormHref(form.file);
                const isSameOriginPath = href.startsWith('/');
                return (
                  <Link
                    key={form.id}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    {...(isSameOriginPath ? { download: true } : {})}
                    className="group flex min-h-40 flex-col justify-between rounded-[1.25rem] border border-black/10 bg-white p-5 shadow-sm transition-transform duration-200 hover:-translate-y-1 text-left w-full"
                  >
                    <CheckCircle2 className="h-5 w-5 text-brand-blue" aria-hidden />
                    <p className="text-base font-medium leading-relaxed text-brand-black/80">
                      Download {form.label}
                    </p>
                    <div className="flex justify-end">
                      <Image
                        src={isFirst ? '/images/file.png' : '/images/pdf.png'}
                        alt=""
                        width={64}
                        height={64}
                        aria-hidden="true"
                        className="h-14 w-14 object-contain"
                      />
                    </div>
                  </Link>
                );
              })}
            </div>

            <div className="rounded-[1.5rem] border border-black/10 bg-white p-6 shadow-sm">
              <h3 className="text-[2rem] text-brand-black">Required Documents</h3>
              <ul className="mt-5 space-y-4">
                {documents.map((doc) => (
                  <li key={doc} className="flex items-start gap-3">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-brand-green" />
                    <span className="text-base leading-relaxed text-brand-black/75">{doc}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-sm leading-relaxed text-brand-black/65">
                Download, sign, and email completed forms to{' '}
                <a href="mailto:admin@alhayaat.ca" className="font-medium text-brand-blue hover:underline">
                  admin@alhayaat.ca
                </a>
                .
              </p>
            </div>
          </div>

          <div className="mt-8 rounded-[1.5rem] border border-black/10 border-l-4 border-l-brand-blue bg-white p-6 shadow-sm">
            <h4 className="text-[1.8rem] text-brand-black">{fees.heading}</h4>
            <ul className="mt-4 space-y-3">
              {fees.items.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-brand-green" />
                  <span className="text-base leading-relaxed text-brand-black/75">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </FadeIn>
      </Container>
    </Section>
  );
}
