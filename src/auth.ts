import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import bcryptjs from 'bcryptjs';
import { db } from '@/lib/db';
import { logger } from '@/lib/logger';

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        const email = credentials?.email as string | undefined;
        const password = credentials?.password as string | undefined;

        if (!email || !password) return null;

        try {
          const result = await db.query<{
            id: string;
            email: string;
            password_hash: string;
            role: string;
          }>('SELECT id, email, password_hash, role FROM users WHERE email = $1', [email]);

          const user = result.rows[0];
          if (!user) return null;

          const isValid = await bcryptjs.compare(password, user.password_hash);
          if (!isValid) return null;

          return { id: user.id, email: user.email, role: user.role };
        } catch (error) {
          logger.error('ERR_DB_UNREACHABLE: auth query failed', { error });
          return null;
        }
      },
    }),
  ],
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = (user as { id: string; email: string; role: string }).role;
      }
      return token;
    },
    session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id as string;
        (session.user as typeof session.user & { role: string }).role = token.role as string;
      }
      return session;
    },
  },
  pages: {
    signIn: '/login',
  },
  session: { strategy: 'jwt' },
});
