import { renderRoutes } from '@/routes/generate-routes.tsx';
import { IMainRoute, Paths, Roles } from '@/routes/routes.types.ts';

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
import NotFound from '@/pages/404.tsx';


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
      },
      {
        name: '404',
        title: 'Not found page',
        component: NotFound,
        path: Paths.NOT_FOUND,
        isPublic: true,
      }
    ]
  },
  {
    layout: MainLayout,
    routes: [
        {
          name: 'albums-catalog',
          title: 'AlbumDetails catalog',
          component: AlbumCatalog,
          path: Paths.ALBUMS,
          isPublic: true,
        },
        {
          name: 'album-details',
          title: 'AlbumDetails details',
          component: AlbumDetails,
          path: Paths.ALBUM_DETAILS,
          isPublic: true,
        },
        {
          name: 'create-album',
          title: 'Add album',
          component: CreateAlbum,
          path: Paths.CREATE_ALBUM,
          accessRole: Roles.ADMIN
        },
        {
          name: 'edit-album',
          title: 'Edit album',
          component: EditAlbum,
          path: Paths.EDIT_ALBUM,
          accessRole: Roles.ADMIN
        },
        {
          name: 'favorite-albums',
          title: 'Favorite albums',
          component: Favorites,
          path: Paths.FAVORITE_ALBUMS,
          accessRole: Roles.VISITOR
        }
    ]
  }
];

export const Routes = renderRoutes(routes);