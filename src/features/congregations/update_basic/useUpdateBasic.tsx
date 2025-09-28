import { ChangeEvent, useEffect, useMemo, useState } from 'react';
import { useAtom, useSetAtom } from 'jotai';
import {
  congregationBusyState,
  congregationsState,
} from '@states/congregations';
import { showNotification } from '@services/app/notification';
import { UpdateBasicProps } from './index.types';
import { apiCongregationUpdateBasic } from '@services/api/congregations';

const useUpdateBasic = ({ congregation }: UpdateBasicProps) => {
  const [isProcessing, setIsProcessing] = useAtom(congregationBusyState);

  const setCongregations = useSetAtom(congregationsState);

  const [name, setName] = useState(congregation.cong_name);
  const [number, setNumber] = useState(congregation.cong_number.value);
  const [open, setOpen] = useState(false);

  const hasChanged = useMemo(() => {
    return (
      name !== congregation.cong_name ||
      number !== congregation.cong_number.value
    );
  }, [name, number, congregation.cong_name, congregation.cong_number]);

  const handleOpen = () => setOpen(true);

  const handleClose = () => setOpen(false);

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleNumberChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNumber(e.target.value);
  };

  const handleUpdateBasic = async () => {
    if (isProcessing) return;

    try {
      setIsProcessing(true);

      const congregations = await apiCongregationUpdateBasic(
        congregation.id,
        name,
        number
      );

      setCongregations(congregations);

      setOpen(false);
      setIsProcessing(false);
    } catch (error) {
      setIsProcessing(false);
      setOpen(false);

      console.error(error);
      showNotification((error as Error).message, 'error');
    }
  };

  useEffect(() => {
    setName(congregation.cong_name);
    setNumber(congregation.cong_number.value);
  }, [congregation.cong_name, congregation.cong_number.value]);

  return {
    name,
    number,
    hasChanged,
    handleNameChange,
    handleNumberChange,
    open,
    handleOpen,
    handleClose,
    handleUpdateBasic,
  };
};

export default useUpdateBasic;
