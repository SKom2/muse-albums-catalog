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

  async getCurrentSession () {
    const { data, error } = await supabase.auth.getSession()
    if (error) throw error;

    return data
  },

  async signOut() {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;

    return
  }
}