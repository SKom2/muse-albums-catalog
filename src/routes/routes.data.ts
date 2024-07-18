import { renderRoutes } from '@/routes/generate-routes.tsx';
import { IMainRoute, Paths } from '@/routes/routes.types.ts';

// Layouts
import AuthorizationLayout from '@/layouts/AuthorizationLayout.tsx';
import MainLayout from '@/layouts/MainLayout.tsx';

// Pages
import Login from '@/pages/Login.tsx';
import Register from '@/pages/Register.tsx';
import AlbumCatalog from '@/pages/AlbumCatalog.tsx';
import AlbumDetails from '@/pages/AlbumDetails.tsx';
import CreateAlbum from '@/pages/CreateAlbum.tsx';
import EditAlbum from '@/pages/EditAlbum.tsx';
import Favorites from '@/pages/Favorites.tsx';


export const routes: IMainRoute[] = [
  {
    layout: AuthorizationLayout,
    routes: [
      {
        name: 'login',
        title: 'Login page',
        component: Login,
        path: Paths.LOGIN,
        isPublic: true,
      },
      {
        name: 'register',
        title: 'Register page',
        component: Register,
        path: Paths.REGISTER,
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
        routes: [
          {
            name: 'albums-catalog',
            title: 'AlbumDetails catalog',
            hasSideLink: true,
            component: AlbumCatalog,
            path: Paths.ALBUMS,
          },
          {
            name: 'album-details',
            title: 'AlbumDetails details',
            hasSideLink: true,
            component: AlbumDetails,
            path: Paths.ALBUM_DETAILS,
          },
          {
            name: 'create-album',
            title: 'Add album',
            hasSideLink: true,
            component: CreateAlbum,
            path: Paths.CREATE_ALBUM,
          },
          {
            name: 'edit-album',
            title: 'Edit album',
            hasSideLink: true,
            component: EditAlbum,
            path: Paths.EDIT_ALBUM,
          },
          {
            name: 'favorite-albums',
            title: 'Favorite albums',
            hasSideLink: true,
            component: Favorites,
            path: Paths.FAVORITE_ALBUMS,
          }
        ]
      }
    ]
  }
];

export const Routes = renderRoutes(routes);