import { useState } from 'react';
import { AccessRequestDeleteProps } from './index.types';

const useAccessRequestDelete = ({
  request,
  onDelete,
}: AccessRequestDeleteProps) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);

  const handleClose = () => setOpen(false);

  const handleConfirm = () => {
    onDelete(request.request_id);
    setOpen(false);
  };

  return { open, handleOpen, handleClose, handleConfirm };
};

export default useAccessRequestDelete;
