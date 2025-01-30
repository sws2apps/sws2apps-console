import { APICongregation } from './api';

export type CongRole =
  | 'admin'
  | 'coordinator'
  | 'secretary'
  | 'service_overseer'
  | 'midweek_schedule'
  | 'weekend_schedule'
  | 'public_talk_schedule'
  | 'attendance_tracking'
  | 'publisher'
  | 'view_schedules'
  | 'elder'
  | 'ms';

export type CongregationByCountry = {
  country_code: string;
  country_name: string;
  congregations: APICongregation[];
};
