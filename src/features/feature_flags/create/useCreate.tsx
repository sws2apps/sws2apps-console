import { useRef, useState } from 'react';
import { useSetAtom } from 'jotai';
import { APIFeatureFlag } from '@definition/api';
import { showNotification } from '@services/app/notification';
import { featureFlagsState } from '@states/feature_flags';
import { apiFlagsCreate } from '@services/api/feature_flags';

const useFeatureFlagCreate = () => {
  const nameRef = useRef<HTMLInputElement | null>(null);
  const descRef = useRef<HTMLInputElement | null>(null);

  const setFlags = useSetAtom(featureFlagsState);

  const [isProcessing, setIsProcessing] = useState(false);
  const [open, setOpen] = useState(false);
  const [availability, setAvailability] =
    useState<APIFeatureFlag['availability']>('app');

  const handleOpen = () => setOpen(true);

  const handleClose = () => {
    setIsProcessing(false);
    setOpen(false);
  };

  const handleAvailabilityChange = (value: string | null) => {
    setAvailability(value as APIFeatureFlag['availability']);
  };

  const handleCreateFlag = async () => {
    if (isProcessing) return;

    const name = nameRef.current?.value || '';
    const desc = descRef.current?.value || '';

    if (name.length === 0 || desc.length === 0) return;

    try {
      setIsProcessing(true);

      const flags = await apiFlagsCreate({ name, desc, availability });
      setFlags(flags);

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
    availability,
    handleAvailabilityChange,
    nameRef,
    descRef,
    handleCreateFlag,
    isProcessing,
  };
};

export default useFeatureFlagCreate;
