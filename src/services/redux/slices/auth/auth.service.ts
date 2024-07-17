import supabase from '@/services/api/supabaseClient.ts';
import { FieldValues } from 'react-hook-form';

export enum Tokens {
  ACCESS_TOKEN = 'accessToken',
}

export const authService = {
  async register ({ email, password }: FieldValues) {
    const { data } = await supabase.auth.signUp({
      email: email,
      password: password
    })

    return data
  },

  async login ({ email, password }: FieldValues) {
    const { data } = await supabase.auth.signInWithPassword({
      email: email,
      password: password
    })

    return data
  },

  async getCurrentSession () {
    const { data } = await supabase.auth.getSession()

    return data
  }
}