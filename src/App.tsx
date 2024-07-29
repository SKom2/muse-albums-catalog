import { BrowserRouter } from 'react-router-dom';
import { routes, Routes } from './routes/routes.data.ts';
import { ThemeContextProvider } from '@/context/ThemeContext.tsx';
import { ReactContextProvider } from '@/context/RoutesContext.tsx';

function App() {
  return <Routes />;
}

const WrappedApp = () => {
  return (
    <BrowserRouter basename="muse-catalog">
      <ThemeContextProvider>
        <ReactContextProvider mainRoutes={routes}>
          <App />
        </ReactContextProvider>
      </ThemeContextProvider>
    </BrowserRouter>
    )
}

export default WrappedApp
