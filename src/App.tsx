import { BrowserRouter } from 'react-router-dom';
import { Routes } from './routes/routes.data.ts';

function App() {
  return (
    <div className="dark h-full w-full main-text">
      <Routes />
    </div>
  )
}

const WrappedApp = () => {
  return (
    <BrowserRouter basename="muse-catalog">
        <App />
    </BrowserRouter>
    )
}

export default WrappedApp
