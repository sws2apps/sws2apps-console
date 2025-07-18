import { useState } from 'react';
import { RemoveCongregationProps } from './index.types';

const useRemoveCongregation = ({ onConfirm }: RemoveCongregationProps) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);

  const handleClose = () => setOpen(false);

  const handleConfirm = () => {
    onConfirm?.();
    setOpen(false);
  };

  return { open, handleOpen, handleClose, handleConfirm };
};

export default useRemoveCongregation;
