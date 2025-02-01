import { useEffect, useState } from 'react';
import { useSetAtom } from 'jotai';
import { LabelProps } from './index.types';
import { showNotification } from '@services/app/notification';
import { featureFlagsState } from '@states/feature_flags';
import { apiFlagToggle } from '@services/api/feature_flags';

const useLabel = ({ flag }: LabelProps) => {
  const setFlags = useSetAtom(featureFlagsState);

  const [isProcessing, setIsProcessing] = useState(false);
  const [checked, setChecked] = useState(flag.status);

  const handleSwitch = async (checked: boolean) => {
    if (isProcessing) return;

    setChecked(checked);

    try {
      setIsProcessing(true);

      const flags = await apiFlagToggle(flag.id);
      setFlags(flags);

      setIsProcessing(false);
    } catch (error) {
      setChecked(flag.status);

      setIsProcessing(false);

      console.error(error);
      showNotification((error as Error).message, 'error');
    }
  };

  useEffect(() => {
    setChecked(flag.status);
  }, [flag]);

  return { handleSwitch, checked };
};

export default useLabel;
