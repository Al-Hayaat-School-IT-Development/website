import { Pool } from 'pg';
import { ManagedIdentityCredential } from '@azure/identity';

let pool: Pool | null = null;

export function getPool(): Pool {
  if (pool) return pool;

  const poolOptions = {
    max: 10,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 10000,
    // Azure Database for PostgreSQL Flexible Server requires SSL.
    // rejectUnauthorized:false avoids cert-chain issues with Azure's CA.
    ssl: { rejectUnauthorized: false },
  };

  if (process.env.DATABASE_URL) {
    // Local development: plain connection string with password.
    pool = new Pool({ ...poolOptions, connectionString: process.env.DATABASE_URL });
  } else if (process.env.PGHOST) {
    // Production: Entra ID token auth via the app's managed identity.
    // pg calls password() for every new connection, so tokens are always fresh.
    const credential = new ManagedIdentityCredential(process.env.AZURE_CLIENT_ID!);
    pool = new Pool({
      ...poolOptions,
      host: process.env.PGHOST,
      database: process.env.PGDATABASE,
      user: process.env.PGUSER,
      port: Number(process.env.PGPORT ?? 5432),
      password: async () => {
        const { token } = await credential.getToken(
          'https://ossrdbms-aad.database.windows.net/.default'
        );
        return token;
      },
    });
  } else {
    throw new Error(
      'ERR_DB_NOT_CONFIGURED: set DATABASE_URL (local dev) or PGHOST/PGDATABASE/PGUSER (production)'
    );
  }

  return pool;
}

export const db = {
  query: <T = unknown>(text: string, params?: unknown[]) =>
    getPool().query<{ [K in keyof T]: T[K] }>(text, params),
};
