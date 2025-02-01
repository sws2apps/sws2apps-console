import { useState } from 'react';
import { useSetAtom } from 'jotai';
import { APIUser } from '@definition/api';
import { apiUsersGet } from '@services/api/users';
import { showNotification } from '@services/app/notification';
import { FlagUsersProps } from './index.type';
import { featureFlagsState } from '@states/feature_flags';
import { apiUserFlagToggle } from '@services/api/feature_flags';

const useFlagUsers = ({ flag }: FlagUsersProps) => {
  const setFlags = useSetAtom(featureFlagsState);

  const [isProcessing, setIsProcessing] = useState(false);
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState<APIUser[]>([]);
  const [loading, setLoading] = useState(false);
  const [inputValue, setInputValue] = useState('');

  const [user, setUser] = useState<APIUser | null>(null);

  const handleOpen = async () => {
    try {
      setOpen(true);

      setLoading(true);

      const options = await apiUsersGet();

      setOptions(
        options.filter(
          (user) =>
            user.profile.global_role !== 'admin' &&
            flag.users.some((u) => u.id === user.id) === false
        )
      );

      setLoading(false);
    } catch (error) {
      setOptions([]);

      console.error(error);
      showNotification((error as Error).message, 'error');
    }
  };

  const handleClose = () => {
    setOpen(false);
    setOptions([]);
  };

  const handleUserAdd = async (value: APIUser | null) => {
    setUser(value);

    if (!value || isProcessing) return;

    try {
      setIsProcessing(true);
      setIsProcessing(false);

      const flags = await apiUserFlagToggle(value.id, flag.id);
      setFlags(flags);

      setUser(null);
      setInputValue('');
    } catch (error) {
      setUser(null);
      setIsProcessing(false);
      setInputValue('');

      console.error(error);
      showNotification((error as Error).message, 'error');
    }
  };

  return {
    open,
    options,
    loading,
    handleOpen,
    handleClose,
    user,
    handleUserAdd,
    inputValue,
    setInputValue,
  };
};

export default useFlagUsers;
