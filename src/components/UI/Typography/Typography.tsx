import React from 'react';

type Variant = 'h1' | 'h2' | 'h3' | 'h4' | 'body1' | 'button';

export const variantMap: Record<Variant, { tag: keyof JSX.IntrinsicElements; className: string }> =
  {
    h1: { tag: 'h1', className: 'text-6xl font-extrabold tracking-tight text-textCol' },
    h2: { tag: 'h2', className: 'text-4xl font-normal tracking-tight first:mt-0 text-textCol' },
    h3: { tag: 'h3', className: 'text-2xl font-normal tracking-tight' },
    h4: { tag: 'h4', className: 'text-xl font-normal tracking-tight' },
    body1: { tag: 'p', className: 'text-2xl leading-7 align-center' },
    button: { tag: 'button', className: 'text-xl leading-6 font-light tracking-[0] text-textCol' },
  };

const Typography: React.FC<{
  variant?: Variant;
  id?: string;
  children: React.ReactNode;
  classname?: string;
}> = ({ variant = 'body1', classname, id, children }) => {
  const { tag: Tag, className } = variantMap[variant];
  return (
    <Tag id={id} className={`${className} ${classname}`}>
      {children}
    </Tag>
  );
};

export default Typography;
