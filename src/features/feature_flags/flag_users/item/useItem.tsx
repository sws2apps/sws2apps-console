import { useState } from 'react';
import { useSetAtom } from 'jotai';
import { showNotification } from '@services/app/notification';
import { FlagUserProps } from './index.type';
import { featureFlagsState } from '@states/feature_flags';
import { apiUserFlagToggle } from '@services/api/feature_flags';

const useFlagUser = ({ flag, user }: FlagUserProps) => {
  const setFlags = useSetAtom(featureFlagsState);

  const [isProcessing, setIsProcessing] = useState(false);
  const [checked, setChecked] = useState(true);

  const handleUserDelete = async (value: boolean) => {
    setChecked(value);

    if (isProcessing) return;

    try {
      setIsProcessing(true);
      setIsProcessing(false);

      const flags = await apiUserFlagToggle(user.id, flag);
      setFlags(flags);
    } catch (error) {
      setIsProcessing(false);

      console.error(error);
      showNotification((error as Error).message, 'error');
    }
  };

  return {
    checked,
    handleUserDelete,
  };
};

export default useFlagUser;
