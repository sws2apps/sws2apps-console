import { atom } from 'jotai';
import { APICountry } from '@definition/api';

export const countriesState = atom<APICountry[]>([]);
