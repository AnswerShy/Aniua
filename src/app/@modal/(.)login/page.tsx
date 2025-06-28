'use client';

import Login from '@/components/Screens/Login/Login';
import { Modal } from '@/components/UI/UIComponents';

export default function LoginModal() {
  return (
    <>
      <Modal>
        <Login />
      </Modal>
    </>
  );
}
