import { AlertColor } from '@mui/material';
import { atom } from 'jotai';

export const notificationOpenState = atom(false);

export const notificationMessageState = atom('');

export const notificationSeverityState = atom<AlertColor>('success');
