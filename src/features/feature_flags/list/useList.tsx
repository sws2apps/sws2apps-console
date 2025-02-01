import { useEffect } from 'react';
import { useAtomValue, useSetAtom } from 'jotai';
import { useQuery } from '@tanstack/react-query';
import { apiFlagsGet } from '@services/api/feature_flags';
import {
  featureFlagsCountState,
  featureFlagsFilteredState,
  featureFlagsState,
} from '@states/feature_flags';

const useFeatureFlagsList = () => {
  const { data: flagsValues, isLoading } = useQuery({
    queryFn: apiFlagsGet,
    queryKey: ['flags'],
  });

  const setFlags = useSetAtom(featureFlagsState);

  const count = useAtomValue(featureFlagsCountState);
  const flags = useAtomValue(featureFlagsFilteredState);

  useEffect(() => {
    if (flagsValues && Array.isArray(flagsValues)) {
      setFlags(flagsValues);
    }
  }, [flagsValues, setFlags]);

  return { isLoading, flags, count };
};

export default useFeatureFlagsList;
