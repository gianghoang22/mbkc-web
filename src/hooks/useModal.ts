import { useState } from 'react';

function useModal() {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = (title: any) => {
    setIsOpen(!isOpen);
  };

  return { handleOpen, isOpen };
}

export { useModal };
