/* eslint-disable camelcase */
import { useState } from 'react';

export default function useCustomizedModalFeature() {
  const [showModal, setShowModal] = useState(false);
  const [modalActionKey, setModalActionKey] = useState<string>();

  const toggleModal = (): void => {
    setShowModal((prev) => !prev);
  };

  return {
    showModal,
    toggleModal,
    modalActionKey,
    setModalActionKey,
  };
}
