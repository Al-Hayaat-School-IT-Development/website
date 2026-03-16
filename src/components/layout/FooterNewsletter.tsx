'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import sharedData from '@/content/_shared.json';

export function FooterNewsletter() {
  const { newsletter } = sharedData.footer;
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!email) return;

    setStatus('loading');
    try {
      const res = await fetch('/api/newsletter/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      if (res.ok) {
        setStatus('success');
        setMessage('Thank you for subscribing!');
        setEmail('');
      } else {
        setStatus('error');
        setMessage('Something went wrong. Please try again.');
      }
    } catch {
      setStatus('error');
      setMessage('Something went wrong. Please try again.');
    }
  }

  return (
    <div>
      <p className="text-sm font-semibold text-white mb-1">{newsletter.label}</p>
      <p className="text-sm text-white/70 mb-3">{newsletter.description}</p>
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
        <Input
          type="email"
          placeholder={newsletter.placeholder}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          disabled={status === 'loading' || status === 'success'}
          className="bg-white/10 border-white/20 text-white placeholder:text-white/40 focus-visible:ring-[#c9a84c]"
          aria-label="Email address for newsletter"
        />
        <Button
          type="submit"
          disabled={status === 'loading' || status === 'success'}
          className="bg-[#c9a84c] text-[#1e3a5f] font-semibold hover:bg-[#b8963e] shrink-0"
        >
          {status === 'loading' ? 'Subscribing…' : newsletter.submit_label}
        </Button>
      </form>
      {message && (
        <p
          className={`mt-2 text-sm ${status === 'success' ? 'text-green-400' : 'text-red-400'}`}
          role="alert"
        >
          {message}
        </p>
      )}
    </div>
  );
}
