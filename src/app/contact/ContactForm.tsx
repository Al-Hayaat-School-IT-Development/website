'use client';

import { FormField, AlertBanner } from '@/components/ui';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import contactContent from '@/content/contact.json';

export default function ContactForm() {
  const { form } = contactContent;

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-8 shadow-sm">
      <h2 className="mb-6 text-xl font-semibold text-gray-900">{form.heading}</h2>

      <AlertBanner variant="info">
        {form.coming_soon_note}
      </AlertBanner>

      <form
        className="mt-6 space-y-5"
        onSubmit={(e) => e.preventDefault()}
        aria-label="Contact form"
      >
        <FormField label="Name" name="name" required>
          <Input name="name" type="text" disabled placeholder="Your name" />
        </FormField>

        <FormField label="Email" name="email" required>
          <Input name="email" type="email" disabled placeholder="your@email.com" />
        </FormField>

        <FormField label="Subject" name="subject">
          <Input name="subject" type="text" disabled placeholder="Subject" />
        </FormField>

        <FormField label="Message" name="message" required>
          <Textarea name="message" rows={5} disabled placeholder="Your message" />
        </FormField>

        <Button type="submit" size="lg" className="w-full" disabled>
          {form.submit_label}
        </Button>
      </form>
    </div>
  );
}
