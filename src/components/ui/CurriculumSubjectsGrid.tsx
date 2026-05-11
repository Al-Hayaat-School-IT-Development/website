import { cn } from '@/lib/utils';
import { subjectIcons, type SubjectId } from './icons/SubjectIcons';

/** Shared by home curriculum block and curriculum page — matches Webflow academic icon grid. */
export interface CurriculumSubjectItem {
  id: SubjectId;
  label: string;
}

export interface CurriculumSubjectsGridProps {
  subjects: CurriculumSubjectItem[];
  className?: string;
}

export function CurriculumSubjectsGrid({ subjects, className }: Readonly<CurriculumSubjectsGridProps>) {
  return (
    <ul
      role="list"
      className={cn(
        'm-0 grid list-none grid-cols-2 gap-x-[1.375rem] gap-y-[1.375rem] p-0',
        className,
      )}
    >
      {subjects.map((subject) => (
        <li key={subject.id} className="flex items-center gap-6">
          <span className="flex h-6 w-6 shrink-0 items-center justify-center text-brand-black" aria-hidden>
            {subjectIcons[subject.id]}
          </span>
          <span className="font-body text-[1.2rem] font-medium leading-[1.3] text-brand-black opacity-80">
            {subject.label}
          </span>
        </li>
      ))}
    </ul>
  );
}
