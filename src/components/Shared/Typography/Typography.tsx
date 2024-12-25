import React from 'react';

type Variant = 'h1' | 'h2' | 'h3' | 'h4' | 'body1' | 'button';

export const variantMap: Record<Variant, { tag: keyof JSX.IntrinsicElements; className: string }> = {
  h1: { tag: 'h1', className: 'text-6xl font-extrabold tracking-tight' },
  h2: { tag: 'h2', className: 'text-4xl font-normal tracking-tight first:mt-0' },
  h3: { tag: 'h3', className: 'text-3xl font-normal tracking-tight' },
  h4: { tag: 'h4', className: 'text-xl font-normal tracking-tight' },
  body1: { tag: 'p', className: 'leading-7 align-center' },
  button: { tag: 'button', className: 'font-medium text-xl' },
};

const Typography: React.FC<{ variant?: Variant; children: React.ReactNode }> = ({
  variant = 'body1',
  children,
}) => {
  const { tag: Tag, className } = variantMap[variant];
  return <Tag className={className}>{children}</Tag>;
};

export default Typography;
