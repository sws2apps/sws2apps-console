import { APICongregation } from './api';

export type CongregationByCountry = {
  country_code: string;
  country_name: string;
  congregations: APICongregation[];
};
