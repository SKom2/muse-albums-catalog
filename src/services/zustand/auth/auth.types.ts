import {Session, User} from '@supabase/supabase-js';
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
  isAuthorizing: boolean;
  isAuthorized: boolean;
  errorMessage: string;

  signIn: (data: FieldValues) => Promise<void>
  signUp: (data: FieldValues) => Promise<void>
  setRole: (user_id: string, role: string) => Promise<void>;
  getRole: (user_id: string) => Promise<void>
  getSession: () => Promise<void>
  signOut: () => Promise<void>
}
