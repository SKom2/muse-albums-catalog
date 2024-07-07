import { renderRoutes } from '@/routes/generate-routes.tsx';
import { ComponentType } from 'react';

// Layouts
import AnonymousLayout from '@/layouts/AnonymousLayout.tsx';
import MainLayout from '@/layouts/MainLayout.tsx';

// Pages
import Login from '@/pages/Login.tsx';
import Register from '@/pages/Register.tsx';
import AlbumCatalog from '@/pages/AlbumCatalog.tsx';
import AlbumDetails from '@/pages/AlbumDetails.tsx';
import CreateAlbum from '@/pages/CreateAlbum.tsx';
import EditAlbum from '@/pages/EditAlbum.tsx';
import Favorites from '@/pages/Favorites.tsx';

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

export const routes: IMainRoute[] = [
  {
    layout: AnonymousLayout,
    routes: [
      {
        name: 'login',
        title: 'Login page',
        component: Login,
        path: '/login',
        isPublic: true,
      },
      {
        name: 'register',
        title: 'Register page',
        component: Register,
        path: '/register',
        isPublic: true,
      }
    ]
  },
  {
    layout: MainLayout,
    routes: [
      {
        name: 'albums',
        title: 'Albums',
        hasSideLink: true,
        routes: [
          {
            name: 'albums-catalog',
            title: 'AlbumDetails catalog',
            hasSideLink: true,
            component: AlbumCatalog,
            path: '/albums',
          },
          {
            name: 'album-details',
            title: 'AlbumDetails details',
            hasSideLink: true,
            component: AlbumDetails,
            path: '/albums/:albumId'
          },
          {
            name: 'create-album',
            title: 'Add album',
            hasSideLink: true,
            component: CreateAlbum,
            path: '/albums/new',
          },
          {
            name: 'edit-album',
            title: 'Edit album',
            hasSideLink: true,
            component: EditAlbum,
            path: '/albums/:albumId/edit',
          },
          {
            name: 'favorite-albums',
            title: 'Favorite albums',
            hasSideLink: true,
            component: Favorites,
            path: '/albums/favorites',
          }
        ]
      }
    ]
  }
];

export const Routes = renderRoutes(routes);