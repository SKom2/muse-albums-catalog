import { Session } from '@supabase/supabase-js';
import { FieldValues } from 'react-hook-form';

export interface IAuthState {
  session: Session | null;
  isLoading: boolean;
  isAuthorized: boolean;
  errorMessage: string;

  signIn: (data: FieldValues) => Promise<void>
  signUp: (data: FieldValues) => Promise<void>
  getCurrentSession: () => Promise<void>
  signOut: () => Promise<void>
}
