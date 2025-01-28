import { GlobalRole } from '@definition/user';

export type MFAStatusProps = {
  role: GlobalRole;
  mfa_enabled?: boolean;
};
