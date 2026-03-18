import React from 'react';
import { cn } from '@/lib/utils';

export interface WhyCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  className?: string;
}

export function WhyCard({ icon, title, description, className }: WhyCardProps) {
  return (
    <div className={cn('flex flex-col gap-8 sm:flex-row sm:items-start lg:gap-16', className)}>
      <div className="h-16 w-16 shrink-0">{icon}</div>
      <div>
        <h3 className="text-[2rem] font-semibold leading-[1.2] text-brand-black">{title}</h3>
        <p className="mt-4 text-[1.2rem] font-medium text-brand-black/80">{description}</p>
      </div>
    </div>
  );
}
