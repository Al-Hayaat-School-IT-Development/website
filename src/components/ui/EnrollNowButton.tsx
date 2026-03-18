import Link from 'next/link';
import { Button } from '@/components/ui/button';

interface EnrollNowButtonProps {
  href?: string;
  label?: string;
  size?: 'default' | 'sm' | 'lg';
  variant?: 'default' | 'ghost' | 'secondary' | 'outline';
  className?: string;
}

export function EnrollNowButton({
  href = '/admissions/apply',
  label = 'Enroll now',
  size = 'default',
  variant = 'default',
  className,
}: EnrollNowButtonProps) {
  return (
    <Button size={size} variant={variant} className={className} render={<Link href={href} />}>
      {label}
    </Button>
  );
}
