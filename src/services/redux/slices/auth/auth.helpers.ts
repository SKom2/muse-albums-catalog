import Cookies from 'js-cookie';
import { Tokens } from '@/services/redux/slices/auth/auth.service.ts';

export const getTokenFromStorage = () => {
  const accessToken = Cookies.get(Tokens.ACCESS_TOKEN)

  return accessToken || null
}

export const saveAccessToken = (accessToken: string) => {
  Cookies.set(Tokens.ACCESS_TOKEN, accessToken, {
    domain: 'localhost',
    sameSite: 'strict',
    expires: 1
  })
}

export const removeAccessToken = () => {
  Cookies.remove(Tokens.ACCESS_TOKEN);
}