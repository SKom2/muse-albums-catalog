import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { authReducer } from '@/services/redux/slices/auth/auth.slice.ts';

const rootReducer = combineReducers({
  auth: authReducer,
})

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false
    }),
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;