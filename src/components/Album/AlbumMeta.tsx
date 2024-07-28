import useAlbumsStore from '@/services/zustand/albums/albums.store.ts';
import { useMemo } from 'react';

const formatDate = (dateString: Date | undefined) => {
  if (!dateString) return 'Unknown date';

  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  }).format(date);
};

const AlbumMeta = () => {
  const selectedAlbum = useAlbumsStore(state => state.selectedAlbum)

  const formattedDate = useMemo(() => formatDate(selectedAlbum?.date_of_issue), [selectedAlbum?.date_of_issue]);

  return (
    <div className="h-fit w-full p-8 bg-screen-default shadow-2xl rounded-lg">
      <div className="flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <b className="caption">Date of issue</b>
          <span className="medium">{formattedDate}</span>
        </div>
        <div className="flex justify-between items-center">
          <b className="caption">Number of tracks</b>
          <span className="medium">{selectedAlbum?.number_of_tracks}</span>
        </div>
        <div className="flex justify-between items-center">
          <b className="caption">Release source</b>
          <span className="medium">{selectedAlbum?.format_name}</span>
        </div>
        <div className="flex justify-between items-center">
          <b className="caption">Genre</b>
          <span className="medium">{selectedAlbum?.genre_name}</span>
        </div>
      </div>
    </div>
  );
};

export default AlbumMeta;