import { AlertColor } from '@mui/material';
import { store } from '@states/app';
import {
  notificationMessageState,
  notificationOpenState,
  notificationSeverityState,
} from '@states/notification';

export const showNotification = (
  message: string,
  severity: AlertColor = 'success'
) => {
  store.set(notificationSeverityState, severity);
  store.set(notificationMessageState, message);
  store.set(notificationOpenState, true);
};
