import { db } from '@/lib/db';

// ── Donations ────────────────────────────────────────────────

export interface Donation {
  id: string;
  stripeSessionId: string;
  amountCad: number;
  donorName: string | null;
  donorEmail: string;
  donorAddress: string | null;
  isAnonymous: boolean;
  status: string;
  createdAt: Date;
}

export interface CreateDonationInput {
  stripeSessionId: string;
  amountCad: number;
  donorName: string | null;
  donorEmail: string;
  donorAddress?: string;
  isAnonymous: boolean;
}

export async function createDonation(input: CreateDonationInput): Promise<Donation | null> {
  const { rows } = await db.query<Donation>(
    `INSERT INTO donations
       (stripe_session_id, amount_cad, donor_name, donor_email, donor_address, is_anonymous)
     VALUES ($1, $2, $3, $4, $5, $6)
     ON CONFLICT (stripe_session_id) DO NOTHING
     RETURNING id, stripe_session_id AS "stripeSessionId", amount_cad AS "amountCad",
               donor_name AS "donorName", donor_email AS "donorEmail",
               donor_address AS "donorAddress", is_anonymous AS "isAnonymous",
               status, created_at AS "createdAt"`,
    [
      input.stripeSessionId,
      input.amountCad,
      input.donorName,
      input.donorEmail,
      input.donorAddress ?? null,
      input.isAnonymous,
    ]
  );
  return rows[0] ?? null;
}

export interface ListDonationsInput {
  page: number;
  perPage: number;
  search?: string;
}

export interface ListDonationsResult {
  donations: Donation[];
  total: number;
  page: number;
  perPage: number;
  totalPages: number;
}

export async function listDonations(input: ListDonationsInput): Promise<ListDonationsResult> {
  const { page, perPage, search } = input;
  const offset = (page - 1) * perPage;
  const searchParam = search ?? null;

  const [dataResult, countResult] = await Promise.all([
    db.query<Donation>(
      `SELECT id, stripe_session_id AS "stripeSessionId", amount_cad AS "amountCad",
              donor_name AS "donorName", donor_email AS "donorEmail",
              donor_address AS "donorAddress", is_anonymous AS "isAnonymous",
              status, created_at AS "createdAt"
       FROM   donations
       WHERE  ($3::text IS NULL
               OR donor_name ILIKE '%' || $3 || '%'
               OR donor_email ILIKE '%' || $3 || '%')
       ORDER  BY created_at DESC
       LIMIT  $1 OFFSET $2`,
      [perPage, offset, searchParam]
    ),
    db.query<{ count: string }>(
      `SELECT COUNT(*)::text AS count
       FROM   donations
       WHERE  ($1::text IS NULL
               OR donor_name ILIKE '%' || $1 || '%'
               OR donor_email ILIKE '%' || $1 || '%')`,
      [searchParam]
    ),
  ]);

  const total = Number.parseInt(countResult.rows[0].count, 10);
  return {
    donations: dataResult.rows,
    total,
    page,
    perPage,
    totalPages: Math.ceil(total / perPage),
  };
}

// ── Contact Submissions ───────────────────────────────────────

export interface ContactSubmissionInput {
  name: string;
  email: string;
  phone?: string;
  message: string;
}

export async function createContactSubmission(input: ContactSubmissionInput): Promise<void> {
  await db.query(
    `INSERT INTO contact_submissions (name, email, phone, message)
     VALUES ($1, $2, $3, $4)`,
    [input.name, input.email, input.phone ?? null, input.message]
  );
}

// ── Newsletter ────────────────────────────────────────────────

export async function upsertNewsletterSubscriber(
  email: string
): Promise<{ isNew: boolean }> {
  const { rows } = await db.query<{ isNew: boolean }>(
    `INSERT INTO newsletter_subscribers (email)
     VALUES ($1)
     ON CONFLICT (email) DO UPDATE SET active = TRUE
     RETURNING (xmax = 0) AS "isNew"`,
    [email]
  );
  return rows[0] ?? { isNew: false };
}

// ── Enrollment Applications ───────────────────────────────────

export interface CreateApplicationInput {
  studentData: Record<string, unknown>;
  guardianData: Record<string, unknown>;
  academicData: Record<string, unknown>;
  additionalData: Record<string, unknown>;
}

export interface Application {
  id: string;
  student_data: Record<string, unknown>;
  guardian_data: Record<string, unknown>;
  academic_data: Record<string, unknown>;
  additional_data: Record<string, unknown>;
  submitted_at: Date;
  status: string;
}

export async function createApplication(
  input: CreateApplicationInput
): Promise<Application | null> {
  const { rows } = await db.query<Application>(
    `INSERT INTO applications (student_data, guardian_data, academic_data, additional_data, status)
     VALUES ($1, $2, $3, $4, 'pending')
     RETURNING *`,
    [
      JSON.stringify(input.studentData),
      JSON.stringify(input.guardianData),
      JSON.stringify(input.academicData),
      JSON.stringify(input.additionalData),
    ]
  );
  return rows[0] ?? null;
}

// ── Dashboard Stats ───────────────────────────────────────────

export interface DashboardStats {
  contactSubmissions: { total: number };
  jobApplications: { total: number; pending: number };
  newsletterSubscribers: { total: number };
  donations: { total: number; totalAmountCad: number };
  recentActivity: Array<{
    type: 'contact' | 'application' | 'donation';
    id: string;
    summary: string;
    createdAt: string;
  }>;
}

export async function getDashboardStats(): Promise<DashboardStats> {
  const [contacts, jobs, subscribers, donations, activity] = await Promise.all([
    db.query<{ total: string }>(
      `SELECT COUNT(*)::text AS total FROM contact_submissions`
    ),
    db.query<{ total: string; pending: string }>(
      `SELECT COUNT(*)::text AS total,
              COUNT(*) FILTER (WHERE status = 'pending')::text AS pending
       FROM job_applications`
    ),
    db.query<{ total: string }>(
      `SELECT COUNT(*)::text AS total FROM newsletter_subscribers WHERE active = TRUE`
    ),
    db.query<{ total: string; total_amount: string }>(
      `SELECT COUNT(*)::text AS total,
              COALESCE(SUM(amount_cad), 0)::text AS total_amount
       FROM donations WHERE status = 'completed'`
    ),
    db.query<{ type: string; id: string; summary: string; created_at: string }>(
      `SELECT type, id, summary, created_at FROM (
         SELECT 'contact' AS type, id::text,
                CONCAT(name, ' — ', SUBSTRING(message, 1, 60)) AS summary,
                created_at
         FROM contact_submissions
         UNION ALL
         SELECT 'application', id::text,
                CONCAT(applicant_name, ' applied for ', position_title) AS summary,
                submitted_at AS created_at
         FROM job_applications
         UNION ALL
         SELECT 'donation', id::text,
                CONCAT('$', amount_cad::text, ' from ',
                       COALESCE(NULLIF(donor_name, ''), donor_email)) AS summary,
                created_at
         FROM donations WHERE status = 'completed'
       ) AS combined
       ORDER BY created_at DESC
       LIMIT 10`
    ),
  ]);

  return {
    contactSubmissions: { total: Number.parseInt(contacts.rows[0].total, 10) },
    jobApplications: {
      total: Number.parseInt(jobs.rows[0].total, 10),
      pending: Number.parseInt(jobs.rows[0].pending, 10),
    },
    newsletterSubscribers: { total: Number.parseInt(subscribers.rows[0].total, 10) },
    donations: {
      total: Number.parseInt(donations.rows[0].total, 10),
      totalAmountCad: Number.parseFloat(donations.rows[0].total_amount),
    },
    recentActivity: activity.rows.map((r) => ({
      type: r.type as 'contact' | 'application' | 'donation',
      id: r.id,
      summary: r.summary,
      createdAt: r.created_at,
    })),
  };
}

// ── Job Applications ──────────────────────────────────────────

export interface CreateJobApplicationInput {
  applicantName: string;
  applicantEmail: string;
  applicantPhone?: string;
  positionTitle: string;
  resumeBlobUrl: string;
  coverLetter?: string;
}

export interface JobApplication {
  id: string;
  applicant_name: string;
  applicant_email: string;
  applicant_phone: string | null;
  position_title: string;
  resume_blob_url: string;
  cover_letter: string | null;
  submitted_at: Date;
  status: string;
}

export async function createJobApplication(
  input: CreateJobApplicationInput
): Promise<JobApplication | null> {
  const { rows } = await db.query<JobApplication>(
    `INSERT INTO job_applications
       (applicant_name, applicant_email, applicant_phone, position_title, resume_blob_url, cover_letter)
     VALUES ($1, $2, $3, $4, $5, $6)
     RETURNING id, applicant_name, applicant_email, applicant_phone, position_title,
               resume_blob_url, cover_letter, submitted_at, status`,
     [
       input.applicantName,
       input.applicantEmail,
       input.applicantPhone ?? null,
       input.positionTitle,
       input.resumeBlobUrl,
       input.coverLetter ?? null,
    ]
  );
  return rows[0] ?? null;
}
