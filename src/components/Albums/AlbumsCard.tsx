import { IAlbum } from '@/services/zustand/albums/albums.types.ts';
import { useNavigate } from 'react-router-dom';
import { Paths } from '@/routes/routes.types.ts';
import EditIcon from "@/assets/icons/EditIcon.tsx";
import {MouseEvent} from "react";
import IconButton from "@/ui/IconButton.tsx";
import useAuthStore from "@/services/zustand/auth/auth.store.ts";
import {Roles} from "@/services/zustand/auth/auth.types.ts";
import TrashIcon from "@/assets/icons/TrashIcon.tsx";
import supabase from "@/services/api/supabaseClient.ts";
import useAlbumsStore from "@/services/zustand/albums/albums.store.ts";

const AlbumsCard = ({ album }: { album: IAlbum }) => {
  const navigate = useNavigate()
  const role = useAuthStore(state => state.role)
  const year = new Date(album.date_of_issue).getFullYear();
  const cover = album.cover.toString()

  const handleOnEditButtonClick = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation()
    navigate(`${Paths.ALBUMS}/${album.id}/edit`)
  }

  const handleOnDeleteButtonClick = async (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation()
    const albumId = album.id
    await supabase.from('albums').delete().match({ id: album.id })
    useAlbumsStore.setState(state => ({
        albums: state.albums?.filter(album => album.id !== albumId),
      })
    )
  }

  return (
    <article className="box-border h-[350px] rounded-lg group/card cursor-pointer p-4 hover:bg-screen-default" onClick={() => navigate(`${Paths.ALBUMS}/${album.id}`)}>
      <div className="h-full flex flex-col gap-5 relative justify-between">
        <img src={cover} alt="Album Card Cover" className="w-full object-cover h-[230px] shadow-2xl rounded transition group-hover/card:shadow-content-tertiary" />
        <div className="flex justify-between items-center">
          <div className="max-w-[170px]">
            <h2 className="heading-3 truncate">{album.name}</h2>
            <p className="medium text-content-secondary truncate">{album.artist_name}, <span>{year}</span></p>
          </div>
          {
            role === Roles.ADMIN &&
              <IconButton type="button" onClick={(e: MouseEvent<HTMLButtonElement>) => handleOnEditButtonClick(e)}>
                <EditIcon/>
              </IconButton>
          }
          {
              role === Roles.ADMIN &&
              <div className="absolute -top-3 -right-3">
                <IconButton type="button" onClick={(e: MouseEvent<HTMLButtonElement>) => handleOnDeleteButtonClick(e)}>
                  <TrashIcon/>
                </IconButton>
              </div>
          }
        </div>
      </div>
    </article>
  );
};

export default AlbumsCard;