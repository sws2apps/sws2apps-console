import { useState } from 'react';
import { UpdateBasicInfoProps } from './index.types';

const useUpdateBasicInfo = ({ onConfirm }: UpdateBasicInfoProps) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);

  const handleClose = () => setOpen(false);

  const handleConfirm = () => {
    onConfirm?.();
    setOpen(false);
  };

  return { open, handleOpen, handleClose, handleConfirm };
};

export default useUpdateBasicInfo;
