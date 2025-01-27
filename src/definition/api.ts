export type APIUserResponseType = {
  message: string;
};

export type APICongregationPerson = {
  id: string;
  firstname: { value: string; updatedAt: string };
  lastname: { value: string; updatedAt: string };
  role: string;
  auth_uid: string;
  createdAt: string;
  congregation: {
    id: string;
    cong_role: string[];
    account_type: string;
    user_local_uid: string;
  };
};

export type APICongregation = {
  id: string;
  country_code: string;
  cong_name: string;
  cong_number: string;
  cong_members: APICongregationPerson[];
};

export type APICountry = {
  countryGuid: string;
  countryCode: string;
  countryName: string;
};
