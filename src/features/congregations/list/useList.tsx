import { useEffect } from 'react';
import { useAtomValue, useSetAtom } from 'jotai';
import { useQuery } from '@tanstack/react-query';
import { apiCongregationsGet } from '@services/api/congregations';
import {
  congregationsByCountryCountState,
  congregationsByCountryState,
  congregationsState,
} from '@states/congregations';

const useCongregationsList = () => {
  const { data: congregations, isFetching: isLoading } = useQuery({
    queryFn: apiCongregationsGet,
    queryKey: ['congregations'],
  });

  const setCongregations = useSetAtom(congregationsState);
  const countriesList = useAtomValue(congregationsByCountryState);
  const count = useAtomValue(congregationsByCountryCountState);

  useEffect(() => {
    if (congregations && Array.isArray(congregations)) {
      setCongregations(congregations);
    }
  }, [congregations, setCongregations]);

  return { isLoading, countriesList, count };
};

export default useCongregationsList;
