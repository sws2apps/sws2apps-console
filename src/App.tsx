import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import { CacheProvider } from '@emotion/react';
import { BrowserRouter, Route, Routes } from 'react-router';
import { Provider } from 'jotai';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import createCache from '@emotion/cache';

import { store } from '@states/app';
import Congregations from '@pages/congregations';
import Dashboard from '@pages/dashboard';
import NavBar from '@components/navbar';
import Notification from '@features/notification';
import Users from '@pages/users';

const cache = createCache({
  key: 'css',
  prepend: true,
});

const theme = createTheme({
  typography: {
    allVariants: { fontFamily: 'Inter', lineHeight: 1.3 },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: { fontFamily: 'Inter' },
        span: { fontFamily: 'Inter !important' },
        text: { fontFamily: 'Inter !important' },
      },
    },
  },
});

const queryClient = new QueryClient();

const App = () => {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <CacheProvider value={cache}>
            <Notification />
            <BrowserRouter>
              <Routes>
                <Route element={<NavBar />}>
                  <Route index element={<Dashboard />} />
                  <Route path="users" element={<Users />} />
                  <Route path="congregations" element={<Congregations />} />
                </Route>
              </Routes>
            </BrowserRouter>
          </CacheProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </Provider>
  );
};

export default App;
