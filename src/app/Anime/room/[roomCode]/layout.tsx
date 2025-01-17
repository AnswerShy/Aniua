import { Suspense } from 'react';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Suspense fallback={<h1>Loading...</h1>}>{children}</Suspense>
    </>
  );
}
