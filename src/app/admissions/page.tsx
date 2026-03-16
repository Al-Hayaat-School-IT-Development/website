import type { Metadata } from 'next';
import Link from 'next/link';
import {
  GraduationCap,
  BookOpen,
  Heart,
  Download,
  CheckCircle,
} from 'lucide-react';
import { Container, Section, Grid, PageHeader } from '@/components/layout';
import { FeatureCard, CTASection, FadeIn } from '@/components/ui';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import admissionsContent from '@/content/admissions.json';

export const metadata: Metadata = {
  title: admissionsContent.meta.title,
  description: admissionsContent.meta.description,
};

const whyChooseIcons = [
  <GraduationCap key="academic" className="h-6 w-6 text-primary" />,
  <BookOpen key="faith" className="h-6 w-6 text-primary" />,
  <Heart key="holistic" className="h-6 w-6 text-primary" />,
];

export default function AdmissionsPage() {
  const { hero, enrollment, why_choose, how_to_apply, requirements, fees, cta } =
    admissionsContent;

  return (
    <main className="min-h-screen bg-white">
      {/* Page Header */}
      <Section background="gray" padding="md">
        <Container>
          <PageHeader
            title={hero.headline}
            subtitle={hero.subtext}
            breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Admissions' }]}
          />
        </Container>
      </Section>

      {/* Enrollment Overview */}
      <Section background="white" padding="lg">
        <Container>
          <FadeIn>
            <h2 className="mb-8 text-2xl font-bold text-gray-900 sm:text-3xl">
              {enrollment.heading}
            </h2>
            <Grid columns={2} gap="lg">
              {enrollment.cards.map((card) => (
                <div
                  key={card.id}
                  className="rounded-xl border border-gray-200 bg-white p-8 shadow-sm"
                >
                  <h3 className="mb-3 text-xl font-semibold text-gray-900">{card.title}</h3>
                  <p className="leading-relaxed text-gray-600">{card.body}</p>
                </div>
              ))}
            </Grid>
          </FadeIn>
        </Container>
      </Section>

      {/* Why Choose Al-Hayaat */}
      <Section background="gray" padding="lg">
        <Container>
          <FadeIn>
            <h2 className="mb-8 text-2xl font-bold text-gray-900 sm:text-3xl">
              {why_choose.heading}
            </h2>
            <Grid columns={3} gap="lg">
              {why_choose.cards.map((card, index) => (
                <FeatureCard
                  key={card.id}
                  icon={whyChooseIcons[index]}
                  title={card.title}
                  description={card.description}
                />
              ))}
            </Grid>
          </FadeIn>
        </Container>
      </Section>

      {/* How to Apply */}
      <Section background="white" padding="lg">
        <Container>
          <FadeIn>
            <h2 className="mb-4 text-2xl font-bold text-gray-900 sm:text-3xl">
              {how_to_apply.heading}
            </h2>
            <p className="mb-8 max-w-2xl text-gray-600">{how_to_apply.intro}</p>
            <ol className="space-y-6">
              {how_to_apply.steps.map((step, index) => (
                <li key={index} className="flex gap-4">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-white">
                    {index + 1}
                  </span>
                  <p className="pt-1 leading-relaxed text-gray-700">{step}</p>
                </li>
              ))}
            </ol>
            <div className="mt-10">
              <Button size="lg" render={<Link href="/admissions/apply" />}>
                Enroll now
              </Button>
            </div>
          </FadeIn>
        </Container>
      </Section>

      {/* Requirements */}
      <Section background="gray" padding="lg">
        <Container>
          <FadeIn>
            <h2 className="mb-8 text-2xl font-bold text-gray-900 sm:text-3xl">
              {requirements.heading}
            </h2>
            <Grid columns={2} gap="lg">
              {/* Required Documents */}
              <div className="rounded-xl border border-gray-200 bg-white p-8">
                <h3 className="mb-4 text-lg font-semibold text-gray-900">Required Documents</h3>
                <ul className="space-y-3">
                  {requirements.documents.map((doc, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-green-600" />
                      <span className="text-sm text-gray-700">{doc}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Downloadable Forms */}
              <div className="rounded-xl border border-gray-200 bg-white p-8">
                <h3 className="mb-4 text-lg font-semibold text-gray-900">Registration Forms</h3>
                <ul className="space-y-3">
                  {requirements.forms.map((form) => (
                    <li key={form.id}>
                      <button
                        type="button"
                        className="flex items-center gap-2 text-sm font-medium text-primary hover:underline"
                        aria-label={`Download ${form.label}`}
                      >
                        <Download className="h-4 w-4" />
                        {form.label}
                      </button>
                    </li>
                  ))}
                </ul>
                <p className="mt-4 text-sm text-gray-500">
                  Download, sign, and email completed forms to{' '}
                  <a
                    href="mailto:admin@alhayaat.ca"
                    className="text-primary hover:underline"
                  >
                    admin@alhayaat.ca
                  </a>
                </p>
              </div>
            </Grid>
          </FadeIn>
        </Container>
      </Section>

      {/* Fee Summary */}
      <Section background="white" padding="lg">
        <Container>
          <FadeIn>
            <div className="flex items-center gap-4 mb-6">
              <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">
                {fees.heading}
              </h2>
              <Badge variant="secondary">Academic Year {fees.academic_year}</Badge>
            </div>
            <div className="overflow-hidden rounded-xl border border-gray-200">
              <table className="w-full text-sm">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left font-semibold text-gray-900">Fee Type</th>
                    <th className="px-6 py-4 text-right font-semibold text-gray-900">Amount</th>
                    <th className="px-6 py-4 text-left font-semibold text-gray-900 hidden sm:table-cell">
                      Notes
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {fees.items.map((item) => (
                    <tr key={item.id} className="bg-white">
                      <td className="px-6 py-4 text-gray-900">{item.type}</td>
                      <td className="px-6 py-4 text-right font-semibold text-gray-900">
                        {item.amount}
                      </td>
                      <td className="px-6 py-4 text-gray-500 hidden sm:table-cell">
                        {item.note}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
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
