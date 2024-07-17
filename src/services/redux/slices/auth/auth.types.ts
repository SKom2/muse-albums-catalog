import { Session, User } from '@supabase/supabase-js';

export interface IUser {
  id: number;
  email: string;
  name: string;
}

export interface IAuthState {
  user: User | null;
  session: Session | null;
  isLoading: boolean;
  isAuthorized: boolean;
  errorMessage: string;
}


export interface UserSession {
  session: Session | null;
  user: User | null;
}
