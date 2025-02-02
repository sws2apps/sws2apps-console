import { atom } from 'jotai';
import { CongregationByCountry } from '@definition/congregation';
import { APICongregation } from '@definition/api';

export const congregationBusyState = atom(false);

export const congregationSearchState = atom('');

export const congregationsState = atom<APICongregation[]>([]);

export const congregationsFilteredState = atom((get) => {
  const congregations = get(congregationsState);
  const search = get(congregationSearchState);

  const filtered = congregations.filter((record) => {
    const key = search.toLowerCase();

    if (record.id.toLowerCase().includes(key)) return true;
    if (record.cong_name.toLowerCase().includes(key)) return true;
    if (record.cong_number.toString().toLowerCase().includes(key)) return true;
    if (record.country_code.toLowerCase().includes(key)) return true;
    if (record.country_name.toLowerCase().includes(key)) return true;

    return false;
  });

  return filtered.sort((a, b) => a.cong_name.localeCompare(b.cong_name));
});

export const congregationsByCountryCountState = atom((get) => {
  const congregations = get(congregationsFilteredState);

  return congregations.length;
});

export const congregationsByCountryState = atom((get) => {
  const congregations = get(congregationsFilteredState);

  const result = congregations.reduce(
    (acc: CongregationByCountry[], current) => {
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
        acc.push({
          country_code: current.country_code,
          country_name: current.country_name,
          congregations: [current],
        });
      }

      return acc;
    },
    []
  );

  return result.sort((a, b) => a.country_name.localeCompare(b.country_name));
});
