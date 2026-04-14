/**
 * Registration PDFs: local `public/assets/registration/` or Azure Blob / CDN.
 *
 * Security (Azure Blob Storage):
 * - Prefer a private container; do not put long-lived SAS tokens in NEXT_PUBLIC env.
 * - Options:
 *   1) **API route + short SAS** — `GET /api/registration-forms/[id]` validates session or rate-limits,
 *    then redirects to a blob URL with SAS valid for minutes (server uses AZURE_STORAGE_* only).
 *   2) **Public read-only container** — only for non-sensitive blanks; use stable URLs + CDN in front.
 *   3) **Static web hosting / CDN** — upload PDFs to `$web` or Azure CDN with immutable filenames;
 *    rotate by bumping version in filename (`_v2`).
 *
 * For production, set `NEXT_PUBLIC_REGISTRATION_FORMS_BASE_URL` to your CDN or blob path prefix
 * (without trailing slash). Filenames must match `admissions.json` `requirements.forms[].file`.
 */
export function registrationFormHref(filename: string): string {
  const base = process.env.NEXT_PUBLIC_REGISTRATION_FORMS_BASE_URL?.trim();
  if (base) {
    return `${base.replace(/\/$/, '')}/${encodeURIComponent(filename)}`;
  }
  return `/assets/registration/${encodeURIComponent(filename)}`;
}
