import { store } from '@/services/redux/store.ts';
import { Provider } from 'react-redux';
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
    <Provider store={store}>
      <BrowserRouter basename="muse-catalog">
          <App />
      </BrowserRouter>
    </Provider>
    )
}

export default WrappedApp
