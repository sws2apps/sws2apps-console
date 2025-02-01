import { useState } from 'react';
import { useSetAtom } from 'jotai';
import { showNotification } from '@services/app/notification';
import { FlagCongregationProps } from './index.type';
import { featureFlagsState } from '@states/feature_flags';
import { apiCongregationFlagToggle } from '@services/api/feature_flags';

const useFlagCongregation = ({ flag, cong }: FlagCongregationProps) => {
  const setFlags = useSetAtom(featureFlagsState);

  const [isProcessing, setIsProcessing] = useState(false);
  const [checked, setChecked] = useState(true);

  const handleCongregationDelete = async (value: boolean) => {
    setChecked(value);

    if (isProcessing) return;

    try {
      setIsProcessing(true);
      setIsProcessing(false);

      const flags = await apiCongregationFlagToggle(cong.id, flag);
      setFlags(flags);
    } catch (error) {
      setIsProcessing(false);

      console.error(error);
      showNotification((error as Error).message, 'error');
    }
  };

  return {
    checked,
    handleCongregationDelete,
  };
};

export default useFlagCongregation;
