import { createRoot } from 'react-dom/client'
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from './app/theme/ThemeProvider.tsx';
import { Provider } from 'react-redux';
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import App from './app/App.tsx'
import { store } from './app/store.ts';
import { TooltipProvider } from "@/shared/components/ui/tooltip.tsx"

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
    <ThemeProvider>
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
        <TooltipProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
        </TooltipProvider>
        </QueryClientProvider>
      </Provider>
    </ThemeProvider>
)
