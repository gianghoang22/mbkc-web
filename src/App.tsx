import { HelmetProvider } from 'react-helmet-async';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { store } from 'redux/configStore';
import AppRouter from 'routes/router';
import ThemeProvider from 'theme';
import './language/i18n/i18n';

function App() {
  return (
    <Provider store={store}>
      <HelmetProvider>
        <BrowserRouter>
          <ThemeProvider>
            <AppRouter />
          </ThemeProvider>
        </BrowserRouter>
      </HelmetProvider>
    </Provider>
  );
}

export default App;
