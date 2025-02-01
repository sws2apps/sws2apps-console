import { useAtom } from 'jotai';
import { featureFlagsSearchState } from '@states/feature_flags';

const useFeatureFlagsSearch = () => {
  const [value, setValue] = useAtom(featureFlagsSearchState);

  const handleValueChange = (search: string) => setValue(search);

  return { value, handleValueChange };
};

export default useFeatureFlagsSearch;
