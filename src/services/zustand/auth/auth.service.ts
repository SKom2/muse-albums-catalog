import supabase from '@/services/api/supabaseClient.ts';
import { FieldValues } from 'react-hook-form';

export const authService = {
  async register ({ email, password }: FieldValues) {
    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password
    })
    if (error) throw error;

    return data
  },

  async login ({ email, password }: FieldValues) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password
    })
    if (error) throw error;

    return data
  },

  async getUserRole (user_id: string) {
    const { data: user_role, error } = await supabase
      .from('user_roles')
      .select('role_name')
      .eq('user_id', user_id)
      .single()
    if (error) throw error

    return user_role.role_name
  },

  async signOut() {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;

    return
  },

}