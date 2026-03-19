import Image from 'next/image';

export interface WhyJoinReason {
  id: string;
  title: string;
  description: string;
}

export interface CareersWhyJoinSectionProps {
  id?: string;
  heading: string;
  reasons: WhyJoinReason[];
  className?: string;
}

export function CareersWhyJoinSection({
  id,
  heading,
  reasons,
  className,
}: CareersWhyJoinSectionProps) {
  return (
    <div id={id} className={className}>
      <h2 className="mb-[0.875rem] text-brand-black">{heading}</h2>
      <ul className="list-none space-y-4 pl-0">
        {reasons.map((reason) => (
          <li key={reason.id} className="relative mb-4 pl-[2.5rem] text-[1.125rem] leading-relaxed text-brand-black/75">
            <Image
              src="/images/bullet.png"
              alt=""
              aria-hidden="true"
              width={16}
              height={16}
              className="absolute left-[5px] top-[5px] h-auto w-auto"
            />
            <strong>{reason.title}:</strong> {reason.description}
          </li>
        ))}
      </ul>
    </div>
  );
}
