import { FC, useMemo } from 'react';
import Input from '@/ui/Input';
import Select from '@/components/Select/Select';
import Options from '@/components/Select/Options';
import useFiltersStore from "@/services/zustand/filters/filters.store.ts";
import {IMode} from "@/components/Album/AlbumContainer.tsx";
import useAlbumsStore from "@/services/zustand/albums/albums.store.ts";

const formatDate = (dateString: Date) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(date);
};

const AlbumMeta: FC<{
  mode: IMode;
  register: any;
  handleFieldsOnChange: (name: string, value: string) => void;
}> = ({ mode, register, handleFieldsOnChange }) => {
  const formats = useFiltersStore(state => state.formats);
  const genres = useFiltersStore(state => state.genres);

  const selectedAlbum = useAlbumsStore(state => state.selectedAlbum)
  const newAlbum = useAlbumsStore(state => state.newAlbum)

  const isCreateMode = mode === "create"

  const formattedDate = useMemo(() => {
    const date = isCreateMode ? newAlbum?.date_of_issue : selectedAlbum?.date_of_issue;
    if (!date) return 'Unknown date';
    return formatDate(date);
  }, [mode, newAlbum?.date_of_issue, selectedAlbum?.date_of_issue]);

  return (
      <div className="h-fit w-full p-6 bg-screen-default shadow-2xl rounded-lg">
        <div className={`grid grid-cols-[150px_1fr] items-center ${mode ? 'gap-2' : 'gap-4'}`}>
          <b className="caption">Date of issue</b>
          {mode ? (
              <Input
                  name="date_of_issue"
                  type="date"
                  register={register}
                  defaultValue={isCreateMode ? newAlbum?.date_of_issue?.toString(): selectedAlbum?.date_of_issue.toString()}
              />
          ) : (
              <span className="medium text-end">{formattedDate}</span>
          )}
          <b className="caption">Number of tracks</b>
          {mode ? (
              <Input
                  type="number"
                  name="number_of_tracks"
                  register={register}
                  placeholder="Number of tracks"
                  defaultValue={isCreateMode ? newAlbum?.number_of_tracks?.toString() : selectedAlbum?.number_of_tracks.toString()}
              />
          ) : (
              <span className="medium text-end">{selectedAlbum?.number_of_tracks}</span>
          )}
          <b className="caption">Release source</b>
          {mode ? (
              <Select
                  placeholder="Choose format"
                  selectedOption={isCreateMode ? newAlbum?.format_name : selectedAlbum?.format_name}
                  setSelectedOption={(value) => handleFieldsOnChange('format_name', value)}
              >
                <Options options={formats} />
              </Select>
          ) : (
              <span className="medium text-end">{selectedAlbum?.format_name}</span>
          )}
          <b className="caption">Genre</b>
          {mode ? (
              <Select
                  placeholder="Choose genre"
                  selectedOption={isCreateMode ? newAlbum?.genre_name : selectedAlbum?.genre_name}
                  setSelectedOption={(value) => handleFieldsOnChange('genre_name', value)}
              >
                <Options options={genres} />
              </Select>
          ) : (
              <span className="medium text-end">{selectedAlbum?.genre_name}</span>
          )}
        </div>
      </div>
  );
};

export default AlbumMeta;
