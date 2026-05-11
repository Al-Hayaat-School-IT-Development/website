'use client';

import { useState, useEffect, useTransition } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { JobApplication, updateApplicationStatus, fetchAllApplications } from './actions';
import { exportToCsv } from '@/lib/utils/csv-export';
import { 
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow 
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import EmptyState from '@/components/ui/EmptyState';
import PaginationBar from '@/components/ui/PaginationBar';
import { Download, FileText } from 'lucide-react';
import { toast } from 'sonner';
import { useDebounce } from '@/lib/hooks/use-debounce';

interface ApplicationTableProps {
  applications: JobApplication[];
  total: number;
  page: number;
  perPage: number;
  search: string;
  position: string;
  positions: string[];
}

export default function ApplicationTable({ 
  applications,
  total,
  page,
  perPage,
  search,
  position,
  positions
}: Readonly<ApplicationTableProps>) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const [searchTerm, setSearchTerm] = useState(search);
  const [debouncedSearch] = useDebounce(searchTerm, 500);

  const [isExporting, setIsExporting] = useState(false);

  // Update URL when search term changes
  useEffect(() => {
    if (debouncedSearch !== search) {
      const params = new URLSearchParams(searchParams);
      if (debouncedSearch) {
        params.set('search', debouncedSearch);
      } else {
        params.delete('search');
      }
      params.set('page', '1');
      
      startTransition(() => {
        router.push(`${pathname}?${params.toString()}`);
      });
    }
  }, [debouncedSearch, pathname, router, search, searchParams]);

  const handlePositionChange = (val: string | null) => {
    const params = new URLSearchParams(searchParams);
    if (val && val !== 'all') {
      params.set('position', val);
    } else {
      params.delete('position');
    }
    params.set('page', '1');
    startTransition(() => {
      router.push(`${pathname}?${params.toString()}`);
    });
  };

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', newPage.toString());
    startTransition(() => {
      router.push(`${pathname}?${params.toString()}`);
    });
  };

  const handleStatusChange = (id: string, newStatus: string) => {
    startTransition(async () => {
      const result = await updateApplicationStatus(id, newStatus);
      if (result.success) {
        toast.success('Status updated successfully');
      } else {
        toast.error(result.error || 'Failed to update status');
      }
    });
  };

  const handleExportCsv = async () => {
    try {
      setIsExporting(true);
      const allApps = await fetchAllApplications();
      
      const dataToExport = allApps.map(app => ({
        'Applicant Name': app.applicant_name,
        'Email': app.applicant_email,
        'Phone': app.applicant_phone || 'N/A',
        'Position': app.position_title,
        'Status': app.status,
        'Submitted At': new Date(app.submitted_at).toLocaleString(),
        'Resume URL': app.resume_blob_url,
        'Cover Letter': app.cover_letter ? 'Provided' : 'None'
      }));

      exportToCsv('job_applications_export.csv', dataToExport);
      toast.success('Exported successfully');
    } catch {
      toast.error('Failed to export applications');
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="flex w-full sm:w-auto items-center gap-3">
          <Input
            placeholder="Search name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full sm:w-[250px] bg-white"
          />
          <Select
            value={position || 'all'}
            onValueChange={handlePositionChange}
            disabled={isPending}
          >
            <SelectTrigger className="w-[180px] bg-white">
              <SelectValue placeholder="All Positions" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Positions</SelectItem>
              {positions.map(pos => (
                <SelectItem key={pos} value={pos}>{pos}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <Button variant="outline" size="sm" onClick={handleExportCsv} disabled={isExporting}>
          <Download className="mr-2 h-4 w-4" />
          {isExporting ? 'Exporting...' : 'Export to CSV'}
        </Button>
      </div>

      <div className="rounded-lg border bg-white shadow-sm overflow-hidden">
        <Table>
          <TableHeader className="bg-gray-50/50">
            <TableRow>
              <TableHead className="font-semibold">Applicant</TableHead>
              <TableHead className="font-semibold">Position</TableHead>
              <TableHead className="font-semibold">Applied Date</TableHead>
              <TableHead className="font-semibold">Status</TableHead>
              <TableHead className="text-right font-semibold">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {applications.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="py-12">
                  <EmptyState
                    heading="No applications found"
                    body="There are no job applications matching your criteria."
                    icon={<FileText className="h-10 w-10 text-gray-400" />}
                  />
                </TableCell>
              </TableRow>
            ) : (
              applications.map((app) => (
                <TableRow key={app.id} className={isPending ? 'opacity-60 transition-opacity' : ''}>
                  <TableCell>
                    <div className="font-medium text-gray-900">{app.applicant_name}</div>
                    <div className="text-sm text-gray-500">{app.applicant_email}</div>
                    {app.applicant_phone && (
                      <div className="text-xs text-gray-400 mt-0.5">{app.applicant_phone}</div>
                    )}
                  </TableCell>
                  <TableCell className="font-medium text-gray-700">{app.position_title}</TableCell>
                  <TableCell className="text-sm text-gray-600">
                    {new Date(app.submitted_at).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <Select
                      defaultValue={app.status}
                      onValueChange={(val) => {
                        if (val) handleStatusChange(app.id, val);
                      }}
                      disabled={isPending}
                    >
                      <SelectTrigger className="w-[130px] h-8 bg-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="new">New</SelectItem>
                        <SelectItem value="reviewed">Reviewed</SelectItem>
                        <SelectItem value="contacted">Contacted</SelectItem>
                        <SelectItem value="pending">Pending</SelectItem>
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="outline" size="sm" onClick={() => window.open(app.resume_blob_url, '_blank', 'noopener,noreferrer')}>
                        Resume
                      </Button>
                      {app.cover_letter && (
                        <Button variant="secondary" size="sm" onClick={() => window.open(app.cover_letter!, '_blank', 'noopener,noreferrer')}>
                          Cover Letter
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
      
      {total > 0 && (
        <PaginationBar
          total={total}
          page={page}
          perPage={perPage}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
}
