import { Container, Section } from '@/components/layout';
import { FadeIn } from '@/components/ui';
import { Badge } from '@/components/ui/badge';

export interface FeeItem {
  id: string;
  type: string;
  amount: string;
  note?: string;
}

export interface AdmissionsFeesTableSectionProps {
  id?: string;
  heading: string;
  academicYear: string;
  items: FeeItem[];
  className?: string;
}

export function AdmissionsFeesTableSection({
  id,
  heading,
  academicYear,
  items,
  className,
}: Readonly<AdmissionsFeesTableSectionProps>) {
  return (
    <Section id={id} background="white" padding="lg" className={className}>
      <Container>
        <FadeIn>
          <div className="mb-6 flex flex-wrap items-center gap-4">
            <h2 className="text-brand-black">{heading}</h2>
            <Badge variant="secondary">Academic Year {academicYear}</Badge>
          </div>
          <p className="mb-6 text-base text-brand-black/65">
            The following is the school fees schedule for the academic year {academicYear}.
          </p>
          <div className="overflow-hidden rounded-[1.5rem] border border-black/10">
            <table className="w-full text-left text-sm sm:text-base">
              <thead className="bg-brand-off-white">
                <tr>
                  <th scope="col" className="px-5 py-4 font-semibold text-brand-black">Fee Type</th>
                  <th scope="col" className="px-5 py-4 text-center font-semibold text-brand-black">Amount</th>
                  <th scope="col" className="hidden px-5 py-4 text-center font-semibold text-brand-black sm:table-cell">Notes</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-black/10 bg-white">
                {items.map((item) => (
                  <tr key={item.id}>
                    <td className="px-5 py-4 text-brand-black">{item.type}</td>
                    <td className="px-5 py-4 text-center font-semibold text-brand-black">{item.amount}</td>
                    <td className="hidden px-5 py-4 text-center text-brand-black/65 sm:table-cell">{item.note || '—'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </FadeIn>
      </Container>
    </Section>
  );
}
