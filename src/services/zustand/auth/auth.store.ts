import { create } from 'zustand';
import { createJSONStorage, devtools, persist } from 'zustand/middleware';
import { IAuthState } from '@/services/zustand/auth/auth.types.ts';
import { FieldValues } from 'react-hook-form';
import { authService } from '@/services/zustand/auth/auth.service.ts';

const handleAuth = async (
  authFunc: (data: FieldValues) => Promise<any>,
  data: FieldValues,
  set: (state: Partial<IAuthState>) => void
) => {
  set({ isLoading: true, errorMessage: '' });
  try {
    const response = await authFunc(data);
    if (response?.session) {
      set({ session: response.session, user: response.session?.user, isAuthorized: !!response.session?.access_token });
      return Promise.resolve();
    } else if (response?.user) {
      return Promise.resolve();
    }
      else {
      throw new Error('Authentication failed');
    }
  } catch (error: any) {
    set({ errorMessage: error.message });
    return Promise.reject(error);
  } finally {
    set({ isLoading: false });
  }
};


const useAuthStore = create<IAuthState>()(
  devtools(
    persist(
      (set) => ({
        session: null,
        user: null,
        isLoading: false,
        isAuthorized: false,
        errorMessage: '',

        signIn: async (data: FieldValues) => {
          return handleAuth(authService.login, data, set);
        },

        signUp: async (data: FieldValues) => {
          return handleAuth(authService.register, data, set);
        },

        getCurrentSession: async () => {
          set({ isLoading: true, errorMessage: '' });
          try {
            const response = await authService.getCurrentSession();
            if (response?.session) {
              set({ session: response.session, user: response.session?.user, isAuthorized: !!response.session?.access_token });
              return Promise.resolve();
            }
          } catch (error: any) {
            set({ errorMessage: error.message });
            return Promise.reject(error);
          } finally {
            set({ isLoading: false });
          }
        },

        signOut: async () => {
          set({ isLoading: true, errorMessage: '' });
          try {
            set({ session: null, isAuthorized: false });
            await authService.signOut()
            return Promise.resolve();
          } catch (error: any) {
            set({ errorMessage: error.message });
            return Promise.reject(error);
          } finally {
            set({ isLoading: false });
          }
        },

      }),
      {
        name: 'auth-storage',
        storage: createJSONStorage(() => localStorage),
      },
    ),
  )
)

export default useAuthStore;