import { ComponentType } from 'react';

export enum Roles {
  ADMIN = 'Admin',
  VISITOR = 'Visitor'
}

export type RoleType = Roles.ADMIN | Roles.VISITOR | undefined | null;

export enum Paths {
  LOGIN = '/login',
  REGISTER = '/register',

  NOT_FOUND = '/404',

  ALBUMS = '/albums',
  CREATE_ALBUM = `${ALBUMS}/new`,
  FAVORITE_ALBUMS = `${ALBUMS}/favorites`,
  ALBUM_DETAILS = `${ALBUMS}/:albumId`,
  EDIT_ALBUM = `${ALBUM_DETAILS}/edit`,
}

export interface IRouteBase {
  name: string;
  title: string;
  component?: ComponentType;
  path?: string;
  routes?: Route;
  accessRole?: RoleType;
  isPublic?: boolean;
}

interface PublicRoute extends IRouteBase {
  isPublic: true;
  accessRole?: never;
}

interface PrivateRoute extends IRouteBase {
  isPublic?: false;
  accessRole: Roles.ADMIN | Roles.VISITOR;
}

export type Route = (PublicRoute | PrivateRoute)[];

export interface IMainRoute {
  layout: ComponentType;
  routes: IRouteBase[];
}