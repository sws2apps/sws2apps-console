import { APICongregationPerson } from '@definition/api';

export type UserItemProps = {
  person: APICongregationPerson;
  onDelete: VoidFunction
  onDisableMFA: VoidFunction
};
