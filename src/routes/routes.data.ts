import { renderRoutes } from '@/routes/generate-routes.tsx';
import { IMainRoute, Paths } from '@/routes/routes.types.ts';
import { Roles } from '@/services/zustand/auth/auth.types.ts';

// Layouts
import AuthorizationLayout from '@/layouts/AuthorizationLayout.tsx';
import MainLayout from '@/layouts/MainLayout.tsx';

// Pages
import Login from '@/pages/Login.tsx';
import Register from '@/pages/Register.tsx';
import AlbumCatalog from '@/pages/AlbumCatalog.tsx';
import Album from '@/pages/Album.tsx';
import CreateAlbum from '@/pages/CreateAlbum.tsx';
import EditAlbum from '@/pages/EditAlbum.tsx';
import NotFound from '@/pages/404.tsx';
import FavoriteAlbums from "@/pages/FavoriteAlbums.tsx";


export const routes: IMainRoute[] = [
  {
    layout: AuthorizationLayout,
    routes: [
      {
        name: 'login',
        title: 'Login page',
        component: Login,
        path: Paths.LOGIN,
      },
      {
        name: 'register',
        title: 'Register page',
        component: Register,
        path: Paths.REGISTER,
      },
      {
        name: '404',
        title: 'Not found page',
        component: NotFound,
        path: Paths.NOT_FOUND,
      }
    ]
  },
  {
    layout: MainLayout,
    routes: [
        {
          name: 'albums-catalog',
          title: 'Catalogue',
          component: AlbumCatalog,
          path: Paths.ALBUMS,
          hasSideLink: true
        },
        {
          name: 'favorite-albums',
          title: 'Favorite albums',
          component: FavoriteAlbums,
          path: Paths.FAVORITE_ALBUMS,
          pageAccessRole: [Roles.VISITOR, Roles.ADMIN],
          hasSideLink: true
        },
        {
          name: 'album-details',
          title: 'Album details',
          component: Album,
          path: Paths.ALBUM_DETAILS,
        },
        {
          name: 'create-album',
          title: 'Create New album',
          component: CreateAlbum,
          path: Paths.CREATE_ALBUM,
          pageAccessRole: Roles.ADMIN,
          hasSideLink: true
        },
        {
          name: 'edit-album',
          title: 'Edit album',
          component: EditAlbum,
          path: Paths.EDIT_ALBUM,
          pageAccessRole: Roles.ADMIN,
        },
    ]
  }
];

export const Routes = renderRoutes();