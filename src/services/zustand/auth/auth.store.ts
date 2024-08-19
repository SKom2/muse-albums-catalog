import { create } from 'zustand';
import { IAuthState } from '@/services/zustand/auth/auth.types.ts';
import { FieldValues } from 'react-hook-form';
import { authService } from '@/services/zustand/auth/auth.service.ts';
import {createJSONStorage, persist} from "zustand/middleware";

const handleAuth = async (
  authFunc: (data: FieldValues) => Promise<any>,
  data: FieldValues,
  set: (state: Partial<IAuthState>) => void,
) => {
  set({ isLoading: true, errorMessage: '' });
  try {
      const response = await authFunc(data);

      if (response.session) {
          set({
              session: response.session,
              user: response.session?.user,
              isAuthorized: !!response.session?.access_token,
          });
      }

      if (response.session?.user?.id) {
          await useAuthStore.getState().getRole(response.session.user.id)
      }
  } catch (error: any) {
      const message = error instanceof Error ? error.message : 'Unknown error';
      set({ errorMessage: message });
      throw "Failed to authorize: " + message;
  } finally {
      set({ isLoading: false });
  }
};

const useAuthStore = create<IAuthState>()(
    persist (
        (set, get) => ({
            session: null,
            user: null,
            role: null,
            isLoading: true,
            isAuthorized: false,
            errorMessage: '',

            signIn: async (data: FieldValues) => {
              return handleAuth(authService.login, data, set);
            },

            signUp: async (data: FieldValues) => {
              return handleAuth(authService.register, data, set);
            },

            getRole: async (user_id: string) => {
              set({ isLoading: true });
              try {
                  const role = JSON.parse(localStorage.getItem("role-storage") || "").state.role
                  if (role) {
                      set({ role });
                      return
                  }

                  const user_role = await authService.getUserRole(user_id);

                  if (user_role) {
                      set({ role: user_role });
                  }
              } catch (error: any) {
                  const message = error instanceof Error ? error.message : 'Unknown error';
                  throw "Failed to get role: " + message;
              } finally {
                set({ isLoading: false });
              }
            },

            getSession: async () => {
                set({ isLoading: true });
                try {
                    let response = await authService.getSession()

                    if (!response.session?.access_token && !response.session?.refresh_token) {
                        await get().signOut()
                        return
                    } else if (!response.session?.access_token) {
                        response = await authService.refreshSession()
                    }

                    set({
                        session: response.session,
                        user: response.session?.user,
                        isAuthorized: !!response.session?.access_token,
                    });

                    if (response.session?.user?.id) {
                        await get().getRole(response.session.user.id)
                    }
                } catch (error: any) {
                    const message = error instanceof Error ? error.message : 'Unknown error';
                    throw "Failed to get session: " + message;
                } finally {
                    set({ isLoading: false });
                }
            },

            signOut: async () => {
              set({ isLoading: true });
              try {
                set({ session: null, user: null, role: null, isAuthorized: false });

                await authService.signOut()
              } catch (error: any) {
                  const message = error instanceof Error ? error.message : 'Unknown error';
                  throw "Failed to sign out: " + message;
              } finally {
                set({ isLoading: false });
              }
            },
        }),
        {
            name: 'role-storage',
            storage: createJSONStorage(() => localStorage),
            partialize: (state) => ({ role: state.role }),
        },
    )
)

export default useAuthStore;

