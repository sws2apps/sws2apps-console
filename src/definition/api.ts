import { CongRole } from './congregation';
import { GlobalRole } from './user';

export type APIUserResponseType = {
  message: string;
};

export type APICongregation = {
  id: string;
  country_code: string;
  country_name: string;
  cong_name: string;
  cong_number: { value: string; updatedAt: string };
  createdAt: string;
  data_sync: boolean;
};

export type APICountry = {
  countryGuid: string;
  countryCode: string;
  countryName: string;
};

export type APIUserProfile = {
  createdAt: string;
  global_role: GlobalRole;
  firstname: { value: string; updatedAt: string };
  lastname: { value: string; updatedAt: string };
  congregation: {
    id: string;
    cong_role: CongRole[];
    country_code: string;
    cong_name: string;
    cong_number: string;
  };
  user_local_uid: string;
  user_members_delegate: string[];
  email?: string;
  mfa_enabled?: boolean;
};

export type APIUserSession = {
  identifier: string;
  isSelf: boolean;
  ip: string;
  country_name: string;
  device: {
    browserName: string;
    os: string;
    isMobile: boolean;
  };
  last_seen: string;
};

export type APIUser = {
  id: string;
  profile: APIUserProfile;
  sessions: APIUserSession[];
};

export type APIFeatureFlag = {
  id: string;
  name: string;
  description: string;
  availability: 'app' | 'user' | 'congregation';
  status: boolean;
  coverage: number;
  users: { name: string; id: string }[];
  congregations: { name: string; id: string }[];
};

export type APIRequestCongregation = {
  cong_id: string;
  request_id: string;
  cong_country: string;
  cong_number: string;
  cong_name: string;
  request_status: 'pending' | 'approved' | 'disapproved';
};

export type APICongregationDetails = {
  cong_persons: APIUser[];
  cong_requests: APIRequestCongregation[];
  has_speakers_key: boolean;
};
