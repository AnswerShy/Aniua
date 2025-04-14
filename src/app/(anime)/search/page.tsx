'use client';

import Search from '@/components/Search/Search';
import { Section } from '@/components/UI/UIComponents';

export default function LoginModal() {
  return (
    <Section typeOfSection={'OneColSection'}>
      <Search />
    </Section>
  );
}
