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
}

export function TabsPanel({ tabs, defaultTab, className }: TabsPanelProps) {
  const initialTab = defaultTab ?? tabs[0]?.id;

  return (
    <Tabs
      defaultValue={initialTab}
      className={cn('w-full', className)}
    >
      <TabsList>
        {tabs.map((tab) => (
          <TabsTrigger key={tab.id} value={tab.id}>
            {tab.label}
          </TabsTrigger>
        ))}
      </TabsList>
      {tabs.map((tab) => (
        <TabsContent key={tab.id} value={tab.id}>
          {tab.content}
        </TabsContent>
      ))}
    </Tabs>
  );
}
