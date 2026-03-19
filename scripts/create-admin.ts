/**
 * Create or update an admin user.
 * Usage: npx tsx scripts/create-admin.ts admin@alhayaat.ca yourpassword
 *
 * Requires DATABASE_URL in environment (e.g. in .env.local).
 */
import 'dotenv/config';
import bcryptjs from 'bcryptjs';
import { db } from '../src/lib/db';

async function main() {
  const [, , email, password] = process.argv;

  if (!email || !password) {
    console.error('Usage: npx tsx scripts/create-admin.ts <email> <password>');
    process.exit(1);
  }

  const hash = await bcryptjs.hash(password, 12);

  await db.query(
    `INSERT INTO users (email, password_hash, role)
     VALUES ($1, $2, 'admin')
     ON CONFLICT (email) DO UPDATE SET password_hash = EXCLUDED.password_hash`,
    [email, hash],
  );

  console.log(`✓ Admin user upserted: ${email}`);
  process.exit(0);
}

try {
  await main();
} catch (err) {
  console.error(err);
  process.exit(1);
}
