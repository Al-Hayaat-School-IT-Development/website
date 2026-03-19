'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export interface TabItem {
  id: string;
  label: string;
  content: React.ReactNode;
}

export interface TabsPanelProps {
  tabs: TabItem[];
  defaultTab?: string;
  className?: string;
  listClassName?: string;
  contentClassName?: string;
  orientation?: 'horizontal' | 'vertical';
  variant?: 'default' | 'webflow';
}

export function TabsPanel({
  tabs,
  defaultTab,
  className,
  listClassName,
  contentClassName,
  orientation = 'horizontal',
  variant = 'default',
}: TabsPanelProps) {
  const initialTab = defaultTab ?? tabs[0]?.id;
  const webflowVariant = variant === 'webflow';

  return (
    <Tabs defaultValue={initialTab} className={cn('w-full', className)} orientation={orientation}>
      <TabsList
        variant={webflowVariant ? 'line' : 'default'}
        className={cn(
          webflowVariant &&
            'w-full shrink-0 gap-0 rounded-none bg-transparent p-0 md:mr-20 md:w-auto md:items-start',
          listClassName,
        )}
      >
        {tabs.map((tab) => (
          <TabsTrigger
            key={tab.id}
            value={tab.id}
            className={cn(
              webflowVariant &&
                "min-h-0 justify-start rounded-none border-0 bg-transparent pl-[1.875rem] pr-5 py-[9px] text-left text-[1.5rem] font-medium text-brand-black/50 shadow-none after:hidden transition-[color,opacity,background-color] duration-300 data-active:bg-transparent data-active:text-brand-black data-active:opacity-100 data-active:bg-[url('/images/Polygon-46.svg')] data-active:bg-[length:auto] data-active:bg-[position:0%_center] data-active:bg-no-repeat",
            )}
          >
            {tab.label}
          </TabsTrigger>
        ))}
      </TabsList>
      {tabs.map((tab) => (
        <TabsContent
          key={tab.id}
          value={tab.id}
          className={cn(
            webflowVariant &&
              'rounded-none border-0 bg-transparent p-0 text-[1.4rem] leading-[1.3] text-brand-black shadow-none',
            contentClassName,
          )}
        >
          {tab.content}
        </TabsContent>
      ))}
    </Tabs>
  );
}
