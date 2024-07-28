import { Session, User } from '@supabase/supabase-js';
import { FieldValues } from 'react-hook-form';

export enum Roles {
  ADMIN = 'Admin',
  VISITOR = 'Visitor'
}

export type UserRoleType = Roles | null;

export interface IAuthState {
  session: Session | null;
  user: User | null;
  role: UserRoleType;
  isLoading: boolean;
  isAuthorized: boolean;
  errorMessage: string;

  signIn: (data: FieldValues) => Promise<void>
  signUp: (data: FieldValues) => Promise<void>
  getRole: (user_id: string) => Promise<void>
  signOut: () => Promise<void>
}
