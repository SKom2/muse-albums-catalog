import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IAuthState } from '@/services/redux/slices/auth/auth.types';
import { authService } from '@/services/redux/slices/auth/auth.service';
import { getTokenFromStorage, removeAccessToken, saveAccessToken } from '@/services/redux/slices/auth/auth.helpers';
import { FieldValues } from 'react-hook-form';
import supabase from '@/services/api/supabaseClient';

export const registerUser = createAsyncThunk(
  'auth/register',
  async (data: FieldValues, { fulfillWithValue, rejectWithValue }) => {
    try {
      const response = await authService.register(data);

      if (response) {
        return fulfillWithValue(response);
      } else {
        throw new Error('Registration failed');
      }

    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const loginUser = createAsyncThunk(
  'auth/login',
  async (data: FieldValues, { fulfillWithValue, rejectWithValue }) => {
    try {
      const response = await authService.login(data)

      if (response && response.session && response.session.access_token) {
        saveAccessToken(response.session.access_token);
      } else {
        throw new Error('Login failed');
      }

      return fulfillWithValue(response);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const getCurrentSessionData = createAsyncThunk(
  'auth/getCurrentSessionData',
  async (_, { dispatch, fulfillWithValue, rejectWithValue }) => {
    try {
      const token = getTokenFromStorage();
      if (!token) {
        await dispatch(signOut());
      }
      const response = await authService.getCurrentSession();

      if (response && response.session && response.session.access_token) {
        saveAccessToken(response.session.access_token);
      }

      return fulfillWithValue(response);
    } catch (error) {
      await dispatch(signOut());
      return rejectWithValue(error);
    }
  }
);

export const signOut = createAsyncThunk(
  'auth/signOut',
  async (_, { rejectWithValue }) => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      removeAccessToken()
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const initialState: IAuthState = {
  user: null,
  session: null,
  isLoading: true,
  isAuthorized: false,
  errorMessage: '',
};

const handlePending = (state: IAuthState) => {
  state.isLoading = true;
};

const handleFulfilled = (state: IAuthState, action: PayloadAction<any>) => {
  state.isAuthorized = !!action.payload?.session?.access_token;
  state.isLoading = false;
  state.user = action.payload?.session?.user || null;
  state.session = action.payload?.session || null;
  state.errorMessage = '';
};

const handleRejected = (state: IAuthState, action: PayloadAction<any>) => {
  state.isLoading = false;
  state.user = initialState.user;
  state.session = initialState.session;
  state.errorMessage = (action.payload as Error)?.message || 'An error occurred';
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, handlePending)
      .addCase(registerUser.fulfilled, handleFulfilled)
      .addCase(registerUser.rejected, handleRejected)

      .addCase(loginUser.pending, handlePending)
      .addCase(loginUser.fulfilled, handleFulfilled)
      .addCase(loginUser.rejected, handleRejected)

      .addCase(getCurrentSessionData.fulfilled, handleFulfilled)
      .addCase(getCurrentSessionData.rejected, handleRejected)

      .addCase(signOut.pending, handlePending)
      .addCase(signOut.fulfilled, (state) => {
        state.isAuthorized = false;
        state.user = initialState.user;
        state.session = initialState.session;
        state.isLoading = false;
        state.errorMessage = '';
      })
      .addCase(signOut.rejected, handleRejected);
  },
});

export const authReducer = authSlice.reducer;
