import { ComponentType } from 'react';
import { Roles } from '@/services/zustand/auth/auth.types.ts';

export type PageAccessRoleType = Roles | Roles[] | undefined;

export enum Paths {
  LOGIN = '/login',
  REGISTER = '/register',

  NOT_FOUND = '/404',

  ALBUMS = '/albums',
  CREATE_ALBUM = `${ALBUMS}/new`,
  FAVORITE_ALBUMS = `${ALBUMS}/favorites`,
  ALBUM_DETAILS = `${ALBUMS}/:albumId`,
  EDIT_ALBUM = `${ALBUMS}/:albumId/edit`,
}

export interface IRoute {
  name: string;
  title: string;
  component: ComponentType;
  path: string;
  routes?: IRoute[];
  pageAccessRole?: PageAccessRoleType;
  hasSideLink?: boolean;
}

export interface IMainRoute {
  layout: ComponentType;
  routes: IRoute[];
}