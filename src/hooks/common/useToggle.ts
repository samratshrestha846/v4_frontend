import { useState } from 'react';

export default function useToggle(defaultStatus = false) {
  const [status, setStatus] = useState(defaultStatus);

  const toggle = (): void => {
    setStatus((prev) => !prev);
  };

  return {
    status,
    toggle,
    setStatus,
  };
}
