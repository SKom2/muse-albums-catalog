import { ComponentType } from 'react';

export interface IRoute {
  name: string;
  title: string;
  component?: ComponentType;
  path?: string;
  isPublic?: boolean;
  hasSideLink?: boolean;
  routes?: IRoute[];
}

export interface IMainRoute {
  layout: ComponentType;
  routes: IRoute[]
}

export enum Paths {
  LOGIN = '/login',
  REGISTER = '/register',
  ALBUMS = '/albums',
  ALBUM_DETAILS = '/albums/:albumId',
  CREATE_ALBUM = '/albums/new',
  EDIT_ALBUM = '/albums/:albumId/edit',
  FAVORITE_ALBUMS = '/albums/favorites'
}
