import { atom } from 'recoil';

export const isAdminState = atom({
	key: 'isAdmin',
	default: false,
});

export const visitorIdState = atom({
	key: 'visitorId',
	default: '',
});

export const adminEmailState = atom({
	key: 'adminEmail',
	default: '',
});
