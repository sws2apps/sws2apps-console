export type APIUserResponseType = {
  message: string;
};

export type APICongregation = {
  id: string;
  country_code: string;
  cong_name: string;
  cong_number: string;
};

export type APICountry = {
  countryGuid: string;
  countryCode: string;
  countryName: string;
};

export type APIUserProfile = {
  createdAt: string;
  global_role: string;
  firstname: { value: string; updatedAt: string };
  lastname: { value: string; updatedAt: string };
  cong_role: string[];
  user_local_uid: string;
  user_members_delegate: string[];
  email?: string;
  mfa_enabled?: boolean;
};

export type APIUserSession = {
  dentifier: string;
  isSelf: boolean;
  ip: string;
  country_name: string;
  device: { browserName: string; os: string; isMobile: boolean };
  last_seen: string;
};

export type APICongregationPerson = {
  id: string;
  profile: APIUserProfile;
  sessions: APIUserSession[];
};
