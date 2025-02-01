import { useEffect, useState } from 'react';
import { useSetAtom } from 'jotai';
import { FeatureFlagDetailsProps } from './index.type';
import { showNotification } from '@services/app/notification';
import { apiFlagDelete, apiFlagUpdate } from '@services/api/feature_flags';
import { featureFlagsState } from '@states/feature_flags';

const useFeatureFlagDetails = ({ flag }: FeatureFlagDetailsProps) => {
  const setFlags = useSetAtom(featureFlagsState);

  const [isProcessing, setIsProcessing] = useState(false);
  const [name, setName] = useState(flag.name);
  const [desc, setDesc] = useState(flag.description);
  const [coverage, setCoverage] = useState(flag.coverage);

  const handleNameChange = (value: string) => setName(value);
  const handleDescChange = (value: string) => setDesc(value);
  const handleCoverageChange = (value: number) => setCoverage(value);

  const handleFlagDelete = async () => {
    if (isProcessing) return;

    try {
      setIsProcessing(true);

      const flags = await apiFlagDelete(flag.id);
      setFlags(flags);

      setIsProcessing(false);
    } catch (error) {
      setIsProcessing(false);

      console.error(error);
      showNotification((error as Error).message, 'error');
    }
  };

  const handleFlagUpdate = async () => {
    if (isProcessing) return;

    try {
      setIsProcessing(true);

      if (
        name === flag.name &&
        desc === flag.description &&
        flag.coverage === coverage
      ) {
        showNotification('Nothing to update', 'info');

        setIsProcessing(false);
        return;
      }

      const flags = await apiFlagUpdate({
        id: flag.id,
        name,
        description: desc,
        coverage,
      });
      setFlags(flags);

      setIsProcessing(false);
    } catch (error) {
      setIsProcessing(false);

      console.error(error);
      showNotification((error as Error).message, 'error');
    }
  };

  useEffect(() => {
    setName(flag.name);
    setDesc(flag.description);
    setCoverage(flag.coverage);
  }, [flag]);

  return {
    name,
    handleNameChange,
    desc,
    handleDescChange,
    handleFlagDelete,
    handleFlagUpdate,
    coverage,
    handleCoverageChange,
  };
};

export default useFeatureFlagDetails;
