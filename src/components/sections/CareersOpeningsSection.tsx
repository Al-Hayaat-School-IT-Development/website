import Link from 'next/link';
import Image from 'next/image';

export interface CareerPosition {
  id: string;
  slug: string;
  title: string;
  description: string;
  posterImage?: string;
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
}: Readonly<CareersOpeningsSectionProps>) {
  if (!positions.length) return null;

  return (
    <div id={id} className={className}>
      <h2 className="mb-[2.0625rem] text-brand-black">{heading}</h2>
      <div className="flex max-w-[45.25rem] flex-col gap-[1.5rem]">
        {positions.map((position) => (
          <Link
            key={position.id}
            href={`/careers/${position.slug}`}
            className="group block overflow-hidden rounded-[1.25rem] border border-[#d9d9d9] border-b-[0.625rem] border-b-brand-green bg-white transition-colors hover:bg-brand-off-white-background/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue/35"
          >
            {position.posterImage && (
              <div className="relative aspect-[5/2] w-full overflow-hidden border-b border-[#d9d9d9]">
                <Image
                  src={position.posterImage}
                  alt={`${position.title} hiring poster`}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-[1.015]"
                />
              </div>
            )}

            <div className="p-[1.75rem]">
              <h4 className="mb-3 text-[1.5rem] font-semibold text-brand-black">{position.title}</h4>
              <p className="mb-4 text-[1.125rem] leading-relaxed text-brand-black/75">
                {position.description}
              </p>
              <span className="inline-flex h-11 items-center rounded-[0.875rem] bg-brand-blue px-5 py-3 text-xl font-semibold text-white shadow-[3px_3px_0_0_var(--brand--yellow),inset_0_1px_5.6px_0_rgba(0,0,0,0.25)] transition-all duration-300 group-hover:translate-x-[2px] group-hover:translate-y-[2px] group-hover:shadow-[1px_1px_0_0_var(--brand--yellow),inset_0_1px_5.6px_0_rgba(0,0,0,0.25)]">
                Apply
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
