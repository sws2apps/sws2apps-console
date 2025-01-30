import { useState } from 'react';
import { TerminateSessionsProps } from './index.types';

const useTerminateSessions = ({ onConfirm }: TerminateSessionsProps) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);

  const handleClose = () => setOpen(false);

  const handleConfirm = () => {
    onConfirm?.();
    setOpen(false);
  };

  return { open, handleOpen, handleClose, handleConfirm };
};

export default useTerminateSessions;
