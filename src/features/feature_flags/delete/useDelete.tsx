import { useState } from 'react';
import { FeatureFlagDeleteProps } from './index.types';

const useFeatureFlagDelete = ({ onConfirm }: FeatureFlagDeleteProps) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);

  const handleClose = () => setOpen(false);

  const handleConfirm = () => {
    onConfirm?.();
    setOpen(false);
  };

  return { open, handleOpen, handleClose, handleConfirm };
};

export default useFeatureFlagDelete;
