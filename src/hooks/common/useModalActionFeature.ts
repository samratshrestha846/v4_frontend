/* eslint-disable camelcase */
import { ReactNode, useState } from 'react';

export default function useModalActionFeature() {
  const [showModal, setShowModal] = useState(false);
  const [modalActionKey, setModalActionKey] = useState<string>();
  const [modalContent, setModalContent] = useState<ReactNode>(null);

  const toggleModal = (): void => {
    setShowModal((prev) => !prev);
  };

  return {
    showModal,
    toggleModal,
    modalActionKey,
    setModalActionKey,
    modalContent,
    setModalContent,
  };
}
