import { useAtom } from 'jotai';
import { userSearchState } from '@states/users';

const useUserSearch = () => {
  const [value, setValue] = useAtom(userSearchState);

  const handleValueChange = (search: string) => setValue(search);

  return { value, handleValueChange };
};

export default useUserSearch;
