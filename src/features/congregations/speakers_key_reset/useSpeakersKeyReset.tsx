import { useState } from 'react';
import { SpeakersKeyResetProps } from './index.types';

const useSpeakersKeyReset = ({ onClick }: SpeakersKeyResetProps) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);

  const handleClose = () => setOpen(false);

  const handleConfirm = () => {
    onClick();
    setOpen(false);
  };

  return { open, handleOpen, handleClose, handleConfirm };
};

export default useSpeakersKeyReset;
