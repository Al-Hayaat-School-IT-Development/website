-- Dev seed data (safe to re-run — uses ON CONFLICT DO NOTHING)
-- Admin user (password: admin123 — change in production!)
INSERT INTO users (email, password_hash, role)
VALUES ('admin@alhayaat.ca', '$2b$10$placeholder_hash_replace_before_use', 'admin')
ON CONFLICT (email) DO NOTHING;

-- Sample newsletter subscriber
INSERT INTO newsletter_subscribers (email)
VALUES ('test@example.com')
ON CONFLICT (email) DO NOTHING;
