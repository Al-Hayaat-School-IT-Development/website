'use client';

import { useState, useEffect, useTransition } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import PaginationBar from '@/components/ui/PaginationBar';
import { exportToCsv } from '@/lib/utils/csv-export';
import { markAsReadAction, getAllContactsAction } from './actions';
import { useDebounce } from '@/lib/hooks/use-debounce';

interface Contact {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  message: string;
  createdAt: Date;
  readAt: Date | null;
}

interface ContactTableProps {
  contacts: Contact[];
  total: number;
  page: number;
  perPage: number;
  search: string;
}

export default function ContactTable({
  contacts,
  total,
  page,
  perPage,
  search,
}: ContactTableProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const [searchTerm, setSearchTerm] = useState(search);
  const [debouncedSearch] = useDebounce(searchTerm, 500);

  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
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
      params.set('page', '1'); // reset to page 1 on new search
      
      startTransition(() => {
        router.push(`${pathname}?${params.toString()}`);
      });
    }
  }, [debouncedSearch, pathname, router, search, searchParams]);

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', newPage.toString());
    startTransition(() => {
      router.push(`${pathname}?${params.toString()}`);
    });
  };

  const handleView = async (contact: Contact) => {
    setSelectedContact(contact);
    if (!contact.readAt) {
      await markAsReadAction(contact.id);
    }
  };

  const handleExport = async () => {
    try {
      setIsExporting(true);
      const allContacts = await getAllContactsAction();
      exportToCsv('contacts.csv', allContacts, [
        { key: 'name', label: 'Name' },
        { key: 'email', label: 'Email' },
        { key: 'phone', label: 'Phone' },
        { key: 'message', label: 'Message' },
        { key: 'createdAt', label: 'Submitted At' },
        { key: 'readAt', label: 'Read At' },
      ]);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <Input
          placeholder="Search name or email..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
        <Button onClick={handleExport} disabled={isExporting} variant="outline">
          {isExporting ? 'Exporting...' : 'Export to CSV'}
        </Button>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Status</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Message</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {contacts.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                  No submissions found.
                </TableCell>
              </TableRow>
            ) : (
              contacts.map((contact) => (
                <TableRow key={contact.id} className={isPending ? 'opacity-50' : ''}>
                  <TableCell>
                    {contact.readAt ? (
                      <Badge variant="outline">Read</Badge>
                    ) : (
                      <Badge variant="default">New</Badge>
                    )}
                  </TableCell>
                  <TableCell>{new Date(contact.createdAt).toLocaleDateString()}</TableCell>
                  <TableCell className="font-medium">{contact.name}</TableCell>
                  <TableCell>{contact.email}</TableCell>
                  <TableCell>{contact.phone || '-'}</TableCell>
                  <TableCell className="max-w-[200px] truncate">
                    {contact.message}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button size="sm" variant="outline" onClick={() => handleView(contact)}>
                      View
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <PaginationBar
        total={total}
        page={page}
        perPage={perPage}
        onPageChange={handlePageChange}
      />

      <Dialog open={!!selectedContact} onOpenChange={(open) => !open && setSelectedContact(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Contact Submission</DialogTitle>
            <DialogDescription>
              Submitted on {selectedContact ? new Date(selectedContact.createdAt).toLocaleString() : ''}
            </DialogDescription>
          </DialogHeader>
          {selectedContact && (
            <div className="mt-4 space-y-4 text-sm">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium text-muted-foreground mb-1">Name</h4>
                  <p>{selectedContact.name}</p>
                </div>
                <div>
                  <h4 className="font-medium text-muted-foreground mb-1">Email</h4>
                  <p>
                    <a href={`mailto:${selectedContact.email}`} className="text-primary hover:underline">
                      {selectedContact.email}
                    </a>
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-muted-foreground mb-1">Phone</h4>
                  <p>{selectedContact.phone || 'Not provided'}</p>
                </div>
              </div>
              <div>
                <h4 className="font-medium text-muted-foreground mb-1">Message</h4>
                <div className="whitespace-pre-wrap rounded-md bg-muted p-4 text-foreground">
                  {selectedContact.message}
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
