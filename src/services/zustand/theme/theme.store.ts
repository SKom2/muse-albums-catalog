import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

export interface ThemeState {
  theme: 'dark' | 'light';
  toggleTheme: () => void;
}

const useThemeStore = create<ThemeState>()(
    persist(
        (set) => ({
          theme: 'dark',
          toggleTheme: () => {
            set((state) => ({
              theme: state.theme === 'dark' ? 'light' : 'dark',
            }))
          },
      }),
      {
        name: 'theme-storage',
        storage: createJSONStorage(() => localStorage),
      },
    )
);

export default useThemeStore;
