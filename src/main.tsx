import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { CssBaseline } from '@mui/material';
import store from './app/store';
import React from 'react';
import App from './App';
import './main.css';
import theme from '@/themes/theme';
import { ThemeProvider } from '@emotion/react';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline/>
        <App />
      </ThemeProvider>
    </Provider>
  </React.StrictMode>,
);
