import { Pool } from 'pg';

let pool: Pool | null = null;

export function getPool(): Pool {
  if (!pool) {
    if (!process.env.DATABASE_URL) {
      throw new Error('ERR_DB_NOT_CONFIGURED: DATABASE_URL environment variable is not set');
    }
    pool = new Pool({
      connectionString: process.env.DATABASE_URL,
      max: 10,
      idleTimeoutMillis: 30000,
      connectionTimeoutMillis: 10000,
      // Azure Database for PostgreSQL Flexible Server requires SSL.
      // rejectUnauthorized:false avoids cert-chain issues with Azure's CA.
      // This is safe because the server is accessed via a trusted Azure hostname.
      ssl: { rejectUnauthorized: false },
    });
  }
  return pool;
}

export const db = {
  query: <T = unknown>(text: string, params?: unknown[]) =>
    getPool().query<{ [K in keyof T]: T[K] }>(text, params),
};
