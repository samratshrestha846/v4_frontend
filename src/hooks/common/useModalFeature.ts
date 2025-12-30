/* eslint-disable camelcase */
import { useState } from 'react';

export default function useModalFeature() {
  const [showModal, setShowModal] = useState(false);

  const toggleModal = (): void => {
    setShowModal((prev) => !prev);
  };

  return {
    showModal,
    toggleModal,
    setShowModal,
  };
}
