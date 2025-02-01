import { useState } from 'react';
import { FeatureFlagUpdateProps } from './index.types';

const useFeatureFlagUpdate = ({ onConfirm }: FeatureFlagUpdateProps) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);

  const handleClose = () => setOpen(false);

  const handleConfirm = () => {
    onConfirm?.();
    setOpen(false);
  };

  return { open, handleOpen, handleClose, handleConfirm };
};

export default useFeatureFlagUpdate;
