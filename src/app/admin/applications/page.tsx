import { Metadata } from 'next';
import { fetchApplications } from './actions';
import ApplicationTable from './ApplicationTable';

export const metadata: Metadata = {
  title: 'Job Applications | Admin Dashboard',
  description: 'View and manage job applications.',
};

export default async function AdminApplicationsPage(
  props: {
    searchParams?: Promise<{
      page?: string;
      search?: string;
      position?: string;
    }>;
  }
) {
  const searchParams = await props.searchParams;
  const page = Number(searchParams?.page) || 1;
  const search = searchParams?.search || '';
  const position = searchParams?.position || '';
  const perPage = 10;

  const result = await fetchApplications(page, perPage, search, position);

  return (
    <div className="space-y-6 max-w-6xl mx-auto py-8 px-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">Job Applications</h1>
          <p className="text-muted-foreground mt-1">
            Review and manage candidates applying for open positions.
          </p>
        </div>
      </div>

      <ApplicationTable
        applications={result.applications}
        total={result.total}
        page={page}
        perPage={perPage}
        search={search}
        position={position}
        positions={result.positions}
      />
    </div>
  );
}
