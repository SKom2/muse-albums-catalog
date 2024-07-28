import { Session, User } from '@supabase/supabase-js';
import { FieldValues } from 'react-hook-form';
import { Roles } from '@/routes/routes.types.ts';

export interface IAuthState {
  session: Session | null | undefined;
  user: User | null | undefined;
  role: Roles.ADMIN | Roles.VISITOR | undefined | null;
  isLoading: boolean;
  isAuthorized: boolean;
  errorMessage: string;

  signIn: (data: FieldValues) => Promise<void>
  signUp: (data: FieldValues) => Promise<void>
  getRole: (user_id: string) => Promise<void>
  signOut: () => Promise<void>
}
