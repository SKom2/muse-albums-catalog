import { create } from 'zustand';
import { createJSONStorage, devtools, persist } from 'zustand/middleware';
import { IAuthState } from '@/services/zustand/auth/auth.types.ts';
import { FieldValues } from 'react-hook-form';
import { authService } from '@/services/zustand/auth/auth.service.ts';

const handleAuth = async (
  authFunc: (data: FieldValues) => Promise<any>,
  data: FieldValues,
  set: (state: Partial<IAuthState>) => void,
  getRole: (user_id: string) => Promise<void>
) => {
  set({ isLoading: true, errorMessage: '' });
  try {
    const response = await authFunc(data);
    if (response?.session) {
      set({
        session: response.session,
        user: response.session?.user,
        isAuthorized: !!response.session?.access_token
      });
      if (response.session.user?.id) {
        await getRole(response.session.user.id);
      }
      return response
    } else if (response?.user) {
      return response
    } else {
      throw new Error('Authentication failed');
    }
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    set({ errorMessage: message });
    throw error;
  } finally {
    set({ isLoading: false });
  }
};


const useAuthStore = create<IAuthState>()(
  devtools(
    persist(
      (set, get) => ({
        session: null,
        user: null,
        role: null,
        isLoading: false,
        isAuthorized: false,
        errorMessage: '',

        signIn: async (data: FieldValues) => {
          return handleAuth(authService.login, data, set, get().getRole);
        },

        signUp: async (data: FieldValues) => {
          return handleAuth(authService.register, data, set, get().getRole);
        },

        getRole: async (user_id: string) => {
          set({ isLoading: true, errorMessage: '' });
          try {
            const user_role = await authService.getUserRole(user_id);
            if (user_role) {
              set({ role: user_role });
              return user_role
            }
          } catch (error: any) {
            set({ errorMessage: error.message });
            return error
          } finally {
            set({ isLoading: false });
          }
        },

        signOut: async () => {
          set({ isLoading: true, errorMessage: '' });
          try {
            set({ session: null, user: null, role: null, isAuthorized: false });
            await authService.signOut()
            return Promise.resolve();
          } catch (error: any) {
            set({ errorMessage: error.message });
            return error
          } finally {
            set({ isLoading: false });
          }
        },

      }),
      {
        name: 'auth-storage',
        storage: createJSONStorage(() => localStorage),
        partialize: (state) => ({ session: state.session, role: state.role, user: state.user, isAuthorized: state.isAuthorized }),
      },
    ),
  )
)

export default useAuthStore;