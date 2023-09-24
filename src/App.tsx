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
    </Provider>
  );
}

export default App;
