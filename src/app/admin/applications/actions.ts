'use server';

import { revalidatePath } from 'next/cache';
import { db } from '@/lib/db';
import { logger } from '@/lib/logger';

export interface JobApplication {
  id: string;
  applicant_name: string;
  applicant_email: string;
  applicant_phone: string | null;
  position_title: string;
  resume_blob_url: string;
  cover_letter: string | null;
  status: 'new' | 'reviewed' | 'contacted' | string;
  submitted_at: Date;
}

export interface FetchApplicationsResult {
  applications: JobApplication[];
  total: number;
  totalPages: number;
  positions: string[];
}

export async function fetchApplications(
  page: number = 1,
  pageSize: number = 10,
  search: string = '',
  position: string = ''
): Promise<FetchApplicationsResult> {
  try {
    const offset = (page - 1) * pageSize;
    const searchParam = search ? `%${search}%` : null;
    const positionParam = position || null;

    const [dataResult, countResult, positionsResult] = await Promise.all([
      db.query<JobApplication>(
        `SELECT id, applicant_name, applicant_email, applicant_phone, position_title, resume_blob_url, cover_letter, status, submitted_at
         FROM job_applications
         WHERE ($3::text IS NULL OR applicant_name ILIKE $3 OR applicant_email ILIKE $3)
           AND ($4::text IS NULL OR position_title = $4)
         ORDER BY submitted_at DESC
         LIMIT $1 OFFSET $2`,
        [pageSize, offset, searchParam, positionParam]
      ),
      db.query<{ count: string }>(
        `SELECT COUNT(*)::text AS count
         FROM job_applications
         WHERE ($1::text IS NULL OR applicant_name ILIKE $1 OR applicant_email ILIKE $1)
           AND ($2::text IS NULL OR position_title = $2)`,
        [searchParam, positionParam]
      ),
      db.query<{ position_title: string }>(
        `SELECT DISTINCT position_title FROM job_applications ORDER BY position_title ASC`
      )
    ]);

    const total = parseInt(countResult.rows[0].count, 10);
    return {
      applications: dataResult.rows,
      total,
      totalPages: Math.ceil(total / pageSize),
      positions: positionsResult.rows.map(r => r.position_title)
    };
  } catch (err) {
    logger.error('ERR_FETCH_APPLICATIONS', { err });
    throw new Error('Failed to fetch applications');
  }
}

export async function fetchAllApplications(): Promise<JobApplication[]> {
  try {
    const { rows } = await db.query<JobApplication>(
      `SELECT id, applicant_name, applicant_email, applicant_phone, position_title, resume_blob_url, cover_letter, status, submitted_at
       FROM job_applications
       ORDER BY submitted_at DESC`
    );
    return rows;
  } catch (err) {
    logger.error('ERR_FETCH_ALL_APPLICATIONS', { err });
    throw new Error('Failed to fetch all applications');
  }
}

export async function updateApplicationStatus(id: string, status: string) {
  try {
    await db.query(
      `UPDATE job_applications SET status = $1 WHERE id = $2`,
      [status, id]
    );
    revalidatePath('/admin/applications');
    return { success: true };
  } catch (err) {
    logger.error('ERR_UPDATE_APPLICATION_STATUS', { err });
    return { success: false, error: 'Failed to update status' };
  }
}
