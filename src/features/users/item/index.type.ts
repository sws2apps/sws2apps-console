import { APICongregationPerson } from '@definition/api';

export type UserItemProps = {
  person: APICongregationPerson;
  onDelete: VoidFunction;
  onDisableMFA: VoidFunction;
  onUpdate: (lastname: string, firstname: string, email: string) => void;
};
