import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from './context/ThemeProvider.tsx';
import { Provider } from 'react-redux';
import App from './App.tsx'
import { store } from './store/store.ts';

createRoot(document.getElementById('root')!).render(
    <ThemeProvider>
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    </ThemeProvider>
)
