import { BrowserRouter } from 'react-router-dom';
import { Routes } from './routes/routes.data.ts';
import { ThemeContextProvider } from '@/context/ThemeContext.tsx';

function App() {
  return <Routes />;
}

const WrappedApp = () => {
  return (
    <BrowserRouter basename="muse-catalog">
      <ThemeContextProvider>
        <App />
      </ThemeContextProvider>
    </BrowserRouter>
    )
}

export default WrappedApp
