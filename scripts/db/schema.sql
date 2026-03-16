-- =============================================================
-- Al-Hayaat School — PostgreSQL Schema
-- Run: psql $DATABASE_URL -f scripts/db/schema.sql
-- Idempotent: safe to re-run (uses IF NOT EXISTS)
-- =============================================================

-- Contact form submissions
CREATE TABLE IF NOT EXISTS contact_submissions (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name        VARCHAR(255) NOT NULL,
  email       VARCHAR(255) NOT NULL,
  phone       VARCHAR(50),
  message     TEXT NOT NULL,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Job applications
CREATE TABLE IF NOT EXISTS job_applications (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name        VARCHAR(255) NOT NULL,
  email       VARCHAR(255) NOT NULL,
  position    VARCHAR(255) NOT NULL,
  resume_url  TEXT,
  cover_note  TEXT,
  status      VARCHAR(50) NOT NULL DEFAULT 'pending',
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Newsletter subscribers
CREATE TABLE IF NOT EXISTS newsletter_subscribers (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email         VARCHAR(255) UNIQUE NOT NULL,
  subscribed_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  active        BOOLEAN NOT NULL DEFAULT TRUE
);

-- Donations (enhanced for Stripe P6 integration)
CREATE TABLE IF NOT EXISTS donations (
  id                UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  stripe_session_id TEXT NOT NULL UNIQUE,
  amount_cad        NUMERIC(10,2) NOT NULL,
  donor_name        TEXT,                    -- NULL if is_anonymous
  donor_email       TEXT NOT NULL,
  donor_address     TEXT,
  is_anonymous      BOOLEAN NOT NULL DEFAULT FALSE,
  status            TEXT NOT NULL DEFAULT 'completed',
  created_at        TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Enrollment applications
CREATE TABLE IF NOT EXISTS applications (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_data    JSONB NOT NULL,
  guardian_data   JSONB NOT NULL,
  academic_data   JSONB NOT NULL,
  additional_data JSONB NOT NULL,
  submitted_at    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  status          TEXT NOT NULL DEFAULT 'pending'
);

-- Admin users
CREATE TABLE IF NOT EXISTS users (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email         VARCHAR(255) UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  role          VARCHAR(50) NOT NULL DEFAULT 'admin',
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_contact_created      ON contact_submissions (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_applications_created ON job_applications (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_donations_created    ON donations (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_donations_email      ON donations (donor_email);
CREATE INDEX IF NOT EXISTS idx_subscribers_email    ON newsletter_subscribers (email);
