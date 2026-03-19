import Image from 'next/image';

export interface CurriculumGrowthSectionProps {
  id?: string;
  heading: string;
  body1: string;
  body2: string;
  image: { src: string; alt: string };
  className?: string;
}

export function CurriculumGrowthSection({
  id,
  heading,
  body1,
  body2,
  image,
  className,
}: CurriculumGrowthSectionProps) {
  return (
    <div
      id={id}
      className={`px-4 pb-[7.4375rem] pt-[3.3125rem] sm:px-6 lg:px-10${className ? ` ${className}` : ''}`}
    >
      <div className="mx-auto max-w-7xl">
        <div className="relative lg:h-[42.75rem]">
          {/* Blue card */}
          <div className="flex h-full flex-col justify-between gap-12 overflow-hidden rounded-xl border-b-[13px] border-brand-yellow bg-brand-blue p-10 sm:p-[2.8125rem] lg:flex-row lg:gap-20 lg:p-[2.8125rem_2.8125rem_5rem]">
            {/* Left text */}
            <div className="w-full lg:max-w-[57%]">
              <div className="mb-4">
                <h2 className="text-white">{heading}</h2>
              </div>
              <p className="font-body text-[1.5rem] leading-[1.4] text-white opacity-80">
                {body1}
                <br /><br />
                {body2}
              </p>
            </div>

            {/* Educator image */}
            <div className="relative w-full overflow-hidden rounded-tl-lg rounded-br-lg lg:absolute lg:right-6 lg:top-1/2 lg:-translate-y-1/2 lg:h-[85%] lg:w-[38%] lg:rounded-lg">
              <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes="(max-width: 991px) 100vw, 484px"
                className="object-cover"
              />
            </div>
          </div>

          {/* Decorative SVGs */}
          <div className="absolute right-[32%] top-[5%] hidden lg:block" aria-hidden="true">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M10.0892 0.847157L13.6368 10.0891L4.39484 13.6368L0.847179 4.39482L10.0892 0.847157Z" fill="#12B6B5" />
            </svg>
          </div>
          <div className="absolute bottom-[5%] right-[50%] hidden lg:block" aria-hidden="true">
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12.5098 0.348853L14.2523 14.9678L0.720662 9.16741L12.5098 0.348853Z" fill="#FBBB7D" />
            </svg>
          </div>
          <div className="absolute -bottom-[4.5rem] left-8 hidden lg:block" aria-hidden="true">
            <Image
              src="/images/Frame-1362791622.webp"
              alt="Three overlapping shapes: an orange semicircle, a light blue triangle, and a teal hexagon."
              width={80}
              height={80}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
