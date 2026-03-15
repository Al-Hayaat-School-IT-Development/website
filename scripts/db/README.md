# Database Scripts

## Apply schema
psql $DATABASE_URL -f scripts/db/schema.sql

## Seed dev data
psql $DATABASE_URL -f scripts/db/seed.sql

## Verify schema
psql $DATABASE_URL -f scripts/db/verify.sql

## Tables
| Table | Purpose |
|-------|---------|
| contact_submissions | Contact form submissions from /contact |
| job_applications | Career applications from /careers |
| newsletter_subscribers | Email newsletter sign-ups |
| donations | Stripe donation payments (P6) |
| users | Admin dashboard users |
