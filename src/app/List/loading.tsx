import CardSkeleton from '@/components/UI/Card/CardSkeleton';
import { Section } from '@/components/UI/UIComponents';

export default function Loading() {
  return (
    <Section typeOfSection={'grid'}>
      <CardSkeleton countOfCards={16} />
    </Section>
  );
}
