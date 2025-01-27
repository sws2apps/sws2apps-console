import { useAtom } from 'jotai';
import { congregationSearchState } from '@states/congregations';

const useCongregationSearch = () => {
  const [value, setValue] = useAtom(congregationSearchState);

  const handleValueChange = (search: string) => setValue(search);

  return { value, handleValueChange };
};

export default useCongregationSearch;
