import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter } from "react-router-dom";
import './index.css';
import { AppRouter } from './routes/AppRouter';
import { ThemeProvider } from './common/contexts/ThemeContext';
import { ProgressProvider } from './common/contexts/ProgressContext';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HashRouter>
      <ThemeProvider>
        <ProgressProvider>
          <AppRouter />
        </ProgressProvider>
      </ThemeProvider>
    </HashRouter>
  </StrictMode>,
);