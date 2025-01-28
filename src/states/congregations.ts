import { atom } from 'jotai';
import { CongregationByCountry } from '@definition/congregation';
import { APICongregation } from '@definition/api';
import { countriesState } from './countries';

export const congregationSearchState = atom('');

export const congregationsState = atom<APICongregation[]>([]);

export const congregationsByCountryState = atom((get) => {
  const congregations = get(congregationsState);
  const countries = get(countriesState);
  const search = get(congregationSearchState);

  const filtered = congregations.filter((record) => {
    const country = countries.find(
      (c) => c.countryCode === record.country_code
    );

    const key = search.toLowerCase();

    if (record.cong_name.toLowerCase().includes(key)) return true;
    if (record.cong_number.toString().toLowerCase().includes(key)) return true;
    if (record.country_code.toLowerCase().includes(key)) return true;
    if (country?.countryName.toLowerCase().includes(key)) return true;

    return false;
  });

  const result = filtered.reduce((acc: CongregationByCountry[], current) => {
    const country = acc.find(
      (record) => record.country_code === current.country_code
    );

    if (country) {
      country.congregations.push(current);

      country.congregations.sort((a, b) =>
        a.cong_name.localeCompare(b.cong_name)
      );
    }

    if (!country) {
      const findCountry = countries.find(
        (c) => c.countryCode === current.country_code
      )?.countryName;

      acc.push({
        country_code: current.country_code,
        country_name: findCountry || 'Unknown',
        congregations: [current],
      });
    }

    return acc;
  }, []);

  return result.sort((a, b) => a.country_name.localeCompare(b.country_name));
});

export const congregationsByCountryCountState = atom((get) => {
  const congregations = get(congregationsByCountryState);

  const count = congregations.reduce((acc, current) => {
    return acc + current.congregations.length;
  }, 0);

  return count;
});
