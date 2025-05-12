import { useState } from 'react';
import { useSetAtom } from 'jotai';
import { APICongregation } from '@definition/api';
import { apiCongregationsGet } from '@services/api/congregations';
import { showNotification } from '@services/app/notification';
import { usersState } from '@states/users';
import { apiUserAssignCongregation } from '@services/api/users';
import { CongregationAddProps } from './index.types';

const useCongregationAdd = ({ user }: CongregationAddProps) => {
  const setUsers = useSetAtom(usersState);

  const [isProcessing, setIsProcessing] = useState(false);
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState<APICongregation[]>([]);
  const [loading, setLoading] = useState(false);
  const [inputValue, setInputValue] = useState('');

  const [congregation, setCongregation] = useState<APICongregation | null>(
    null
  );

  const handleOpen = async () => {
    try {
      setOpen(true);

      setLoading(true);

      const options = await apiCongregationsGet();
      setOptions(options);

      setLoading(false);
    } catch (error) {
      setLoading(false);
      setOpen(false);
      setOptions([]);

      console.error(error);
      showNotification((error as Error).message, 'error');
    }
  };

  const handleClose = () => {
    setOpen(false);
    setOptions([]);
  };

  const handleBindUser = async (value: APICongregation | null) => {
    setCongregation(value);

    if (!value || isProcessing) return;

    try {
      setIsProcessing(true);

      const users = await apiUserAssignCongregation(user, value.id);
      setUsers(users);

      setIsProcessing(false);
    } catch (error) {
      setIsProcessing(false);
      setCongregation(null);
      setInputValue('');

      console.error(error);
      showNotification((error as Error).message, 'error');
    }
  };

  return {
    handleClose,
    handleOpen,
    handleBindUser,
    congregation,
    open,
    options,
    loading,
    inputValue,
    setInputValue,
    isProcessing,
  };
};

export default useCongregationAdd;
