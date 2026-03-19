import Link from 'next/link';
import { Button } from '@/components/ui/button';

export interface CareerPosition {
  id: string;
  slug: string;
  title: string;
  description: string;
}

export interface CareersOpeningsSectionProps {
  id?: string;
  heading: string;
  positions: CareerPosition[];
  className?: string;
}

export function CareersOpeningsSection({
  id,
  heading,
  positions,
  className,
}: CareersOpeningsSectionProps) {
  if (!positions.length) return null;

  return (
    <div id={id} className={className}>
      <h2 className="mb-[2.0625rem] text-brand-black">{heading}</h2>
      <div className="flex max-w-[45.25rem] flex-col gap-[1.5rem]">
        {positions.map((position) => (
          <div
            key={position.id}
            className="rounded-[1.25rem] border border-[#d9d9d9] border-b-[0.625rem] border-b-brand-green p-[1.75rem]"
          >
            <h4 className="mb-3 text-[1.5rem] font-semibold text-brand-black">
              <Link href={`/careers/${position.slug}`} className="hover:underline">
                {position.title}
              </Link>
            </h4>
            <p className="mb-4 text-[1.125rem] leading-relaxed text-brand-black/75">
              {position.description}
            </p>
            <Button
              render={
                <Link href={`/careers/apply?position=${encodeURIComponent(position.title)}`} />
              }
            >
              Apply
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
