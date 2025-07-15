'use client';

import { CustomButton } from '@/components/UI/UIComponents';

export default function GlobalError() {
  const reportLink = process.env.NEXT_PUBLIC_REPORT_LINK || '/';
  return (
    <div
      style={{
        padding: 20,
        position: 'absolute',
        left: '50%',
        top: '50%',
        transform: 'translate(-50%, -50%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
      }}
    >
      <h1>Oh, something went wrong with server. Error code is 500 (if you know you know)</h1>
      <h2>
        Please, leave this error code{' '}
        <CustomButton variant="link" url={reportLink}>
          here.
        </CustomButton>
      </h2>
      <CustomButton variant="link" url={reportLink}>
        <img src="/report.gif" style={{ margin: '0 auto' }}></img>
      </CustomButton>
    </div>
  );
}
