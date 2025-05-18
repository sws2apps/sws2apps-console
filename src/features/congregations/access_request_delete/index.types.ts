import { APIRequestCongregation } from '@definition/api';

export type AccessRequestDeleteProps = {
  request: APIRequestCongregation;
  onDelete: (request_id: string) => void;
};
