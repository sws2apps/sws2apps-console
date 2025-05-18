import { APIRequestCongregation } from '@definition/api';

export type CongregationAccessRequestProps = {
  request: APIRequestCongregation;
  onRequestDelete: (request_id: string) => void;
};
