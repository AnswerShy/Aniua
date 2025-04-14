'use client';

import Registration from '@/components/Registration/Registration';
import { Modal } from '@/components/UI/UIComponents';

export default function RegistrationModal() {
  return (
    <>
      <Modal>
        <Registration />
      </Modal>
    </>
  );
}
