'use client';

import { useRouter } from 'next/navigation';
import React from 'react';
import { CustomButton } from '../UIComponents';

function Modal({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  const closeModal = () => {
    router.back();
  };

  return (
    <div
      className="fixed w-full h-full top-[0] p-40 flex items-start justify-center z-[99] backdrop-blur-md bg-transparent00dp"
      data-dialog-backdrop="modal"
      data-dialog-backdrop-close="true"
    >
      <CustomButton variant="outline" classString="absolute right-0 top-0 m-6" onClick={closeModal}>
        <span>Close</span>
        <kbd>ESC</kbd>
      </CustomButton>
      <div
        data-dialog="modal"
        className="gap-5 flex flex-col w-96"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
}

export default Modal;
