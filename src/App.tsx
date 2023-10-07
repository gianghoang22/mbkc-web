/* eslint-disable react-hooks/exhaustive-deps */
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { HelmetProvider } from 'react-helmet-async';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { store } from 'redux/configStore';
import AppRouter from 'routes/router';
import ThemeProvider from 'theme';

function App() {
  return (
    <Provider store={store}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <HelmetProvider>
          <BrowserRouter>
            <ThemeProvider>
              <AppRouter />
              <ToastContainer
                position="top-right"
                autoClose={1500}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                limit={1}
              />
            </ThemeProvider>
          </BrowserRouter>
        </HelmetProvider>
      </LocalizationProvider>
    </Provider>
  );
}

export default App;
