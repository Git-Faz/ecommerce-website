import { createRoot } from 'react-dom/client'
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from './app/theme/ThemeProvider.tsx';
import { Provider } from 'react-redux';
import App from './app/App.tsx'
import { store } from './app/store.ts';
import { TooltipProvider } from "@/shared/components/ui/tooltip.tsx"

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
