'use client';

import { ProgressProvider } from '@bprogress/next/app';

const LoadProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <ProgressProvider
      height="2px"
      color="var(--frontColor)"
      options={{ showSpinner: false }}
      shallowRouting
    >
      {children}
    </ProgressProvider>
  );
};

export default LoadProvider;
