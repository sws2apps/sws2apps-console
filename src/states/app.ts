import { atom, createStore } from 'jotai';

export const store = createStore();

export const apiHostState = atom(() => {
  let apiHost: string;

  if (import.meta.env.VITE_BACKEND_API) {
    apiHost = import.meta.env.VITE_BACKEND_API;
  } else {
    if (
      import.meta.env.DEV ||
      window.location.host.indexOf('localhost') !== -1
    ) {
      apiHost = 'http://localhost:8000/';
    } else {
      apiHost = 'https://api.sws2apps.com/';
    }
  }

  console.log('app', `endpoint url set to ${apiHost}`);

  return apiHost;
});

export const isUserConnectedState = atom(false);

export const isUserVerifyMFAState = atom(false);
