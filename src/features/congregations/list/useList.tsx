import { useEffect, useMemo } from 'react';
import { useAtomValue, useSetAtom } from 'jotai';
import { useQuery } from '@tanstack/react-query';
import { apiCongregationsGet } from '@services/api/congregations';
import { apiCountriesGet } from '@services/api/countries';
import { countriesState } from '@states/countries';
import {
  congregationsByCountryState,
  congregationsState,
} from '@states/congregations';

const useCongregationsList = () => {
  const { data: congregations, isLoading: isLoadingCongregations } = useQuery({
    queryFn: apiCongregationsGet,
    queryKey: ['congregations'],
  });

  const { data: countries, isLoading: isLoadingCountries } = useQuery({
    queryFn: apiCountriesGet,
    queryKey: ['countries'],
  });

  const setCountries = useSetAtom(countriesState);
  const setCongregations = useSetAtom(congregationsState);
  const countriesList = useAtomValue(congregationsByCountryState);

  const isLoading = useMemo(() => {
    return isLoadingCongregations || isLoadingCountries;
  }, [isLoadingCongregations, isLoadingCountries]);

  useEffect(() => {
    if (countries && Array.isArray(countries)) {
      setCountries(countries);
    }
  }, [countries, setCountries]);

  useEffect(() => {
    if (congregations && Array.isArray(congregations)) {
      setCongregations(congregations);
    }
  }, [congregations, setCongregations]);

  return { isLoading, countriesList };
};

export default useCongregationsList;
