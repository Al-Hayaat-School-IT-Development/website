'use client';

import Link from 'next/link';
import { Container, Section, PageHeader } from '@/components/layout';
import { FormField, AlertBanner } from '@/components/ui';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import admissionsContent from '@/content/admissions.json';

const gradeOptions = ['JK', 'SK', 'Grade 1', 'Grade 2', 'Grade 3', 'Grade 4', 'Grade 5'];

export default function AdmissionsApplyPage() {
  const { apply } = admissionsContent;

  return (
    <main className="min-h-screen bg-white">
      {/* Page Header */}
      <Section background="gray" padding="md">
        <Container>
          <PageHeader
            title={apply.heading}
            subtitle={apply.subtext}
            breadcrumbs={[
              { label: 'Home', href: '/' },
              { label: 'Admissions', href: '/admissions' },
              { label: 'Apply' },
            ]}
          />
        </Container>
      </Section>

      {/* Form Section */}
      <Section background="white" padding="lg">
        <Container maxWidth="lg">
          {/* Coming soon banner */}
          <AlertBanner variant="info" title="Coming Soon">
            {apply.note}
          </AlertBanner>

          <form
            className="mt-10 space-y-10"
            onSubmit={(e) => e.preventDefault()}
            aria-label="Student registration form"
          >
            {/* Student Information */}
            <fieldset className="space-y-6">
              <legend className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2 w-full">
                {apply.sections.student}
              </legend>

              <div className="grid gap-6 sm:grid-cols-2">
                <FormField
                  label={apply.fields.student_first_name.label}
                  name="student_first_name"
                  required={apply.fields.student_first_name.required}
                >
                  <Input
                    name="student_first_name"
                    type="text"
                    disabled
                    placeholder="First name"
                  />
                </FormField>

                <FormField
                  label={apply.fields.student_last_name.label}
                  name="student_last_name"
                  required={apply.fields.student_last_name.required}
                >
                  <Input
                    name="student_last_name"
                    type="text"
                    disabled
                    placeholder="Last name"
                  />
                </FormField>
              </div>

              <div className="grid gap-6 sm:grid-cols-2">
                <FormField
                  label={apply.fields.date_of_birth.label}
                  name="date_of_birth"
                  required={apply.fields.date_of_birth.required}
                >
                  <Input name="date_of_birth" type="date" disabled />
                </FormField>

                <FormField
                  label={apply.fields.grade.label}
                  name="grade"
                  required={apply.fields.grade.required}
                >
                  <Select disabled>
                    <SelectTrigger>
                      <SelectValue placeholder="Select grade" />
                    </SelectTrigger>
                    <SelectContent>
                      {gradeOptions.map((option) => (
                        <SelectItem key={option} value={option}>
                          {option}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormField>
              </div>
            </fieldset>

            {/* Parent / Guardian Information */}
            <fieldset className="space-y-6">
              <legend className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2 w-full">
                {apply.sections.parent}
              </legend>

              <FormField
                label={apply.fields.parent_name.label}
                name="parent_name"
                required={apply.fields.parent_name.required}
              >
                <Input name="parent_name" type="text" disabled placeholder="Full name" />
              </FormField>

              <div className="grid gap-6 sm:grid-cols-2">
                <FormField
                  label={apply.fields.parent_email.label}
                  name="parent_email"
                  required={apply.fields.parent_email.required}
                >
                  <Input
                    name="parent_email"
                    type="email"
                    disabled
                    placeholder="email@example.com"
                  />
                </FormField>

                <FormField
                  label={apply.fields.parent_phone.label}
                  name="parent_phone"
                  required={apply.fields.parent_phone.required}
                >
                  <Input name="parent_phone" type="tel" disabled placeholder="Phone number" />
                </FormField>
              </div>

              <FormField
                label={apply.fields.message.label}
                name="message"
                required={apply.fields.message.required}
              >
                <Textarea name="message" rows={4} disabled placeholder="Any additional comments" />
              </FormField>
            </fieldset>

            {/* Submit */}
            <div className="flex items-center gap-4">
              <Button type="submit" size="lg" disabled>
                {apply.submit_label}
              </Button>
              <Link href="/admissions" className="text-sm text-gray-500 hover:underline">
                Back to Admissions
              </Link>
            </div>
          </form>
        </Container>
      </Section>
    </main>
  );
}
