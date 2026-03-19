import type { Metadata } from 'next';
import Link from 'next/link';
import { HandCoins, Mail, Briefcase, Users, TrendingUp } from 'lucide-react';
import { getDashboardStats } from '@/lib/db/queries';
import { logger } from '@/lib/logger';

export const metadata: Metadata = { title: 'Dashboard' };

function formatCAD(amount: number) {
  return new Intl.NumberFormat('en-CA', { style: 'currency', currency: 'CAD', maximumFractionDigits: 0 }).format(amount);
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-CA', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
}

const ACTIVITY_LABELS: Record<string, string> = {
  contact: 'Contact',
  application: 'Application',
  donation: 'Donation',
};
const ACTIVITY_COLORS: Record<string, string> = {
  contact: 'bg-blue-100 text-blue-700',
  application: 'bg-purple-100 text-purple-700',
  donation: 'bg-green-100 text-green-700',
};

interface StatCardProps {
  readonly label: string;
  readonly value: string;
  readonly sub?: string;
  readonly href: string;
  readonly icon: React.ElementType;
  readonly color: string;
  readonly error?: boolean;
}

function StatCard({ label, value, sub, href, icon: Icon, color, error }: StatCardProps) {
  return (
    <Link
      href={href}
      className="group flex flex-col gap-4 rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md"
    >
      <div className="flex items-start justify-between">
        <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${color}`}>
          <Icon className="size-5" />
        </div>
        <TrendingUp className="size-4 text-gray-300 transition-colors group-hover:text-gray-500" />
      </div>
      {error ? (
        <p className="text-sm text-red-500">Failed to load</p>
      ) : (
        <>
          <div>
            <div className="text-2xl font-bold text-gray-900">{value}</div>
            {sub && <div className="mt-0.5 text-xs text-gray-500">{sub}</div>}
          </div>
          <div className="text-sm font-medium text-gray-600">{label}</div>
        </>
      )}
    </Link>
  );
}

interface ActivityItem {
  type: 'contact' | 'application' | 'donation';
  id: string;
  summary: string;
  createdAt: string;
}

function ActivityList({ items }: Readonly<{ items: ActivityItem[] }>) {
  if (items.length === 0) {
    return <p className="px-5 py-8 text-center text-sm text-gray-400">No recent activity.</p>;
  }
  return (
    <ul className="divide-y divide-gray-100">
      {items.map((item) => (
        <li key={item.id} className="flex items-center gap-4 px-5 py-3.5">
          <span
            className={`inline-flex shrink-0 items-center rounded-full px-2 py-0.5 text-xs font-medium ${ACTIVITY_COLORS[item.type]}`}
          >
            {ACTIVITY_LABELS[item.type]}
          </span>
          <span className="flex-1 truncate text-sm text-gray-700">{item.summary}</span>
          <span className="shrink-0 text-xs text-gray-400">{formatDate(item.createdAt)}</span>
        </li>
      ))}
    </ul>
  );
}

export default async function AdminDashboardPage() {
  let stats;
  let dbError = false;

  try {
    stats = await getDashboardStats();
  } catch (err) {
    logger.error('ERR_DB_UNREACHABLE: dashboard stats failed', { err });
    dbError = true;
  }

  const donationSuffix = stats?.donations.total === 1 ? '' : 's';
  const donationCountSub = stats
    ? `${stats.donations.total} donation${donationSuffix}`
    : undefined;

  return (
    <div className="mx-auto max-w-5xl">
      {/* Page header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="mt-1 text-sm text-gray-500">Al-Hayaat School — admin overview</p>
      </div>

      {/* DB error banner */}
      {dbError && (
        <div className="mb-6 rounded-lg border border-red-200 bg-red-50 p-4" role="alert">
          <p className="text-sm text-red-700">
            Unable to connect to the database. Some stats may be unavailable. Please try again or contact your system administrator.
          </p>
        </div>
      )}

      {/* Stat cards */}
      <div className="mb-10 grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          label="Contact Submissions"
          value={stats ? String(stats.contactSubmissions.total) : '—'}
          href="/admin/contacts"
          icon={Mail}
          color="bg-blue-50 text-blue-600"
          error={dbError}
        />
        <StatCard
          label="Job Applications"
          value={stats ? String(stats.jobApplications.total) : '—'}
          sub={stats ? `${stats.jobApplications.pending} pending review` : undefined}
          href="/admin/applications"
          icon={Briefcase}
          color="bg-purple-50 text-purple-600"
          error={dbError}
        />
        <StatCard
          label="Newsletter Subscribers"
          value={stats ? String(stats.newsletterSubscribers.total) : '—'}
          sub="active subscribers"
          href="/admin/subscribers"
          icon={Users}
          color="bg-orange-50 text-orange-600"
          error={dbError}
        />
        <StatCard
          label="Donations Received"
          value={stats ? formatCAD(stats.donations.totalAmountCad) : '—'}
          sub={donationCountSub}
          href="/admin/donations"
          icon={HandCoins}
          color="bg-green-50 text-green-600"
          error={dbError}
        />
      </div>

      {/* Recent activity */}
      <div className="rounded-xl border border-gray-200 bg-white shadow-sm">
        <div className="border-b border-gray-100 px-5 py-4">
          <h2 className="text-base font-semibold text-gray-900">Recent Activity</h2>
          <p className="text-xs text-gray-500">Latest 10 entries across all channels</p>
        </div>

        {dbError || !stats ? (
          <p className="px-5 py-8 text-center text-sm text-gray-400">Unable to load activity.</p>
        ) : (
          <ActivityList items={stats.recentActivity} />
        )}
      </div>
    </div>
  );
}
