import { createRoot } from 'react-dom/client'
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from './context/ThemeProvider.tsx';
import { Provider } from 'react-redux';
import App from './App.tsx'
import { store } from './store/store.ts';
import { TooltipProvider } from "@/components/ui/tooltip"

createRoot(document.getElementById('root')!).render(
    <ThemeProvider>
      <Provider store={store}>
        <TooltipProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
        </TooltipProvider>
      </Provider>
    </ThemeProvider>
)
