import { useState } from 'react';
import { DeleteCongregationProps } from './index.types';

const useDeleteCongregation = ({ onConfirm }: DeleteCongregationProps) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);

  const handleClose = () => setOpen(false);

  const handleConfirm = () => {
    onConfirm?.();
    setOpen(false);
  };

  return { open, handleOpen, handleClose, handleConfirm };
};

export default useDeleteCongregation;
