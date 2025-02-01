import { useState } from 'react';
import { useSetAtom } from 'jotai';
import { APICongregation } from '@definition/api';
import { showNotification } from '@services/app/notification';
import { FlagCongregationsProps } from './index.type';
import { featureFlagsState } from '@states/feature_flags';
import { apiUserFlagToggle } from '@services/api/feature_flags';
import { apiCongregationsGet } from '@services/api/congregations';

const useFlagCongregations = ({ flag }: FlagCongregationsProps) => {
  const setFlags = useSetAtom(featureFlagsState);

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

      setOptions(
        options.filter(
          (cong) => flag.congregations.some((u) => u.id === cong.id) === false
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

  const handleCongregationAdd = async (value: APICongregation | null) => {
    setCongregation(value);

    if (!value || isProcessing) return;

    try {
      setIsProcessing(true);
      setIsProcessing(false);

      const flags = await apiUserFlagToggle(value.id, flag.id);
      setFlags(flags);

      setCongregation(null);
      setInputValue('');
    } catch (error) {
      setCongregation(null);
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
    congregation,
    handleCongregationAdd,
    inputValue,
    setInputValue,
  };
};

export default useFlagCongregations;
