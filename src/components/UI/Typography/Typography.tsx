import React from 'react';

export const variantMap: Record<string, { tag: keyof JSX.IntrinsicElements; className: string }> = {
  h1: {
    tag: 'h1',
    className: 'scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl text-textCol',
  },
  h2: {
    tag: 'h2',
    className: 'scroll-m-20 text-3xl font-semibold tracking-tight first:mt-0 text-textCol',
  },
  h3: {
    tag: 'h3',
    className: 'scroll-m-20 text-2xl font-semibold tracking-tight text-textSemiCol',
  },
  h4: { tag: 'h4', className: 'scroll-m-20 text-xl font-semibold tracking-tight text-textSemiCol' },
  p: { tag: 'p', className: 'leading-7 text-textSemiCol' },
  button: { tag: 'button', className: 'text-sm leading-6 font-light tracking-[0] text-textCol' },
  large: { tag: 'span', className: 'text-lg font-semibold' },
  small: { tag: 'span', className: 'text-sm font-medium leading-none' },
  muted: { tag: 'p', className: 'text-sm text-muted-foreground' },
};

const Typography: React.FC<{
  variant?: keyof typeof variantMap;
  id?: string;
  children: React.ReactNode;
  classname?: string;
}> = ({ variant = 'p', classname, id, children }) => {
  const { tag: Tag, className } = variantMap[variant];
  return (
    <Tag id={id} className={`${className} ${classname}`}>
      {children}
    </Tag>
  );
};

export default Typography;
