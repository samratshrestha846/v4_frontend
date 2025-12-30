/* eslint-disable camelcase */
import { useState } from 'react';

export default function useToggleDropdown() {
  const [showDropdown, setShowDropdown] = useState(false);

  const toggleDropdown = (): void => {
    setShowDropdown((prevValue) => !prevValue);
  };

  return {
    showDropdown,
    toggleDropdown,
    setShowDropdown,
  };
}
