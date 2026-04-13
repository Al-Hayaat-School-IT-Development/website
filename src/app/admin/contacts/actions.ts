'use server';

import { markContactSubmissionAsRead, getAllContactSubmissions } from '@/lib/db/queries';
import { revalidatePath } from 'next/cache';

export async function markAsReadAction(id: string) {
  await markContactSubmissionAsRead(id);
  revalidatePath('/admin/contacts');
}

export async function getAllContactsAction() {
  const contacts = await getAllContactSubmissions();
  // Ensure we send serializable dates back to the client
  return contacts.map(c => ({
    ...c,
    createdAt: c.createdAt.toISOString(),
    readAt: c.readAt ? c.readAt.toISOString() : null,
  }));
}
