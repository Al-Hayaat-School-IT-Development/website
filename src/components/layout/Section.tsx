import { cn } from '@/lib/utils';

export interface SectionProps {
  children: React.ReactNode;
  background?: 'white' | 'gray' | 'off-white-bg' | 'primary' | 'transparent';
  padding?: 'sm' | 'md' | 'lg' | 'none';
  className?: string;
  id?: string;
}

const backgroundMap: Record<NonNullable<SectionProps['background']>, string> = {
  white: 'bg-white',
  gray: 'bg-brand-off-white',
  'off-white-bg': 'bg-brand-off-white-background',
  primary: 'bg-brand-blue',
  transparent: 'bg-transparent',
};

const paddingMap: Record<NonNullable<SectionProps['padding']>, string> = {
  sm: 'py-12',
  md: 'py-20',
  lg: 'py-32',
  none: 'py-0',
};

export function Section({
  children,
  background = 'white',
  padding = 'md',
  className,
  id,
}: Readonly<SectionProps>) {
  return (
    <section id={id} className={cn(backgroundMap[background], paddingMap[padding], className)}>
      {children}
    </section>
  );
}
