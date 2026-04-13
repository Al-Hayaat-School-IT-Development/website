import { Metadata } from 'next';
import { listContactSubmissions } from '@/lib/db/queries';
import ContactTable from './ContactTable';

export const metadata: Metadata = {
  title: 'Contact Submissions | Admin Dashboard',
  description: 'View and manage contact submissions.',
};

export default async function AdminContactsPage(
  props: {
    searchParams?: Promise<{
      page?: string;
      search?: string;
    }>;
  }
) {
  const searchParams = await props.searchParams;
  const page = Number(searchParams?.page) || 1;
  const search = searchParams?.search || '';
  const perPage = 10;

  const result = await listContactSubmissions({ page, perPage, search });

  return (
    <div className="space-y-6 max-w-6xl mx-auto py-8 px-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Contact Submissions</h1>
          <p className="text-muted-foreground mt-1">
            View and respond to inquiries from the contact form.
          </p>
        </div>
      </div>

      <ContactTable
        contacts={result.contacts}
        total={result.total}
        page={result.page}
        perPage={result.perPage}
        search={search}
      />
    </div>
  );
}
