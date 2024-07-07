import './App.css'
import { store } from '@/services/redux/store.ts';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { Routes } from '@/routes/routesData.ts';

function App() {
  return (
    <Routes isAuthorized={true} />
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
