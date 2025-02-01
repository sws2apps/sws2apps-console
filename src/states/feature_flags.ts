import { atom } from 'jotai';
import { APIFeatureFlag } from '@definition/api';

export const featureFlagsSearchState = atom('');

export const featureFlagsState = atom<APIFeatureFlag[]>([]);

export const featureFlagsFilteredState = atom((get) => {
  const flags = get(featureFlagsState);
  const search = get(featureFlagsSearchState);

  const filtered = flags.filter((record) => {
    const key = search.toLowerCase();

    if (record.name.toLowerCase().includes(key)) return true;
    if (record.description.toString().toLowerCase().includes(key)) return true;

    return false;
  });

  return filtered.sort((a, b) => a.name.localeCompare(b.name));
});

export const featureFlagsCountState = atom((get) => {
  const flags = get(featureFlagsFilteredState);

  return flags.length;
});
