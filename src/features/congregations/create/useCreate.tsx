import { useRef, useState } from 'react';
import { useSetAtom } from 'jotai';
import { showNotification } from '@services/app/notification';
import { apiCongregationCreate } from '@services/api/congregations';
import { congregationsState } from '@states/congregations';

const useCongregationCreate = () => {
  const countryRef = useRef<HTMLInputElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const numberRef = useRef<HTMLInputElement>(null);

  const setCongregations = useSetAtom(congregationsState);

  const [open, setOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleOpen = () => setOpen(true);

  const handleClose = () => {
    if (isProcessing) return;

    setOpen(false);
  };

  const handleCreate = async () => {
    if (isProcessing) return;

    try {
      const country = countryRef.current?.value ?? '';
      const name = nameRef.current?.value ?? '';
      const number = numberRef.current?.value ?? '';

      if (country.length === 0 || name.length === 0 || number.length === 0) {
        showNotification('Inputs invalid', 'warning');
        return;
      }

      setIsProcessing(true);

      const congregations = await apiCongregationCreate(country, name, number);
      setCongregations(congregations);

      setIsProcessing(false);
      setOpen(false);
    } catch (error) {
      setIsProcessing(false);

      console.error(error);
      showNotification((error as Error).message, 'error');
    }
  };

  return {
    open,
    handleOpen,
    handleClose,
    countryRef,
    nameRef,
    numberRef,
    handleCreate,
    isProcessing,
  };
};

export default useCongregationCreate;
