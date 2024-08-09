import { IAlbum } from '@/services/zustand/albums/albums.types.ts';
import { useNavigate } from 'react-router-dom';
import { Paths } from '@/routes/routes.types.ts';

const AlbumsCard = ({ album }: { album: IAlbum }) => {
  const navigate = useNavigate()
  const year = new Date(album.date_of_issue).getFullYear();

  return (
    <article className="box-border max-h-[500px] rounded-lg group/card cursor-pointer p-4 hover:bg-screen-default" onClick={() => navigate(`${Paths.ALBUMS}/${album.id}`)}>
      <div className="h-full flex flex-col gap-2">
        <img src={album.cover} alt="Album Card Cover" className="w-full object-cover h-250px shadow-2xl rounded transition group-hover/card:shadow-content-tertiary" />
        <div className="mt-3">
          <h2 className="heading-3">{album.name}</h2>
          <p className="paragraph text-content-secondary">{album.artist_name}, <span>{year}</span></p>
        </div>
      </div>
    </article>
  );
};

export default AlbumsCard;