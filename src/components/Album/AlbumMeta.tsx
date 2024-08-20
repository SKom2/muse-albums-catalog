import { FC, useEffect, useMemo } from 'react';
import Input from '@/ui/Input';
import Select from '@/components/Select/Select';
import Options from '@/components/Select/Options';
import useFiltersStore from "@/services/zustand/filters/filters.store.ts";
import { IMode } from "@/components/Album/AlbumContainer.tsx";
import useAlbumsStore from "@/services/zustand/albums/albums.store.ts";
import { FieldValues, UseFormSetValue } from "react-hook-form";
import {ALBUM_FIELDS} from "@/hooks/useAlbumEditor.tsx";

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
  setValue: UseFormSetValue<FieldValues>
}> = ({ mode, register, handleFieldsOnChange, setValue }) => {
  const formats = useFiltersStore(state => state.formats);
  const genres = useFiltersStore(state => state.genres);
  const selectedAlbum = useAlbumsStore(state => state.selectedAlbum);
  const newAlbum = useAlbumsStore(state => state.newAlbum);
  const isCreateMode = mode === "create";

  const formattedDate = useMemo(() => {
    const date = isCreateMode ? newAlbum?.date_of_issue : selectedAlbum?.date_of_issue;
    if (!date) return 'Unknown date';
    return formatDate(date);
  }, [isCreateMode, newAlbum, selectedAlbum]);

  useEffect(() => {
    setValue(ALBUM_FIELDS.DATE_OF_ISSUE, isCreateMode ? newAlbum?.date_of_issue?.toString() : selectedAlbum?.date_of_issue?.toString());
    setValue(ALBUM_FIELDS.NUMBER_OF_TRACKS, isCreateMode ? newAlbum?.number_of_tracks?.toString() : selectedAlbum?.number_of_tracks?.toString());
  }, []);

  return (
      <div className="h-fit w-full p-6 bg-screen-default shadow-2xl rounded-lg">
        <div className={`grid grid-cols-[150px_1fr] items-center ${mode ? 'gap-2' : 'gap-4'}`}>
          <b className="caption">Date of issue</b>
          {mode ? (
              <Input
                  name={ALBUM_FIELDS.DATE_OF_ISSUE}
                  type="date"
                  register={register}
              />
          ) : (
              <span className="medium text-end">{formattedDate}</span>
          )}
          <b className="caption">Number of tracks</b>
          {mode ? (
              <Input
                  type="number"
                  name={ALBUM_FIELDS.NUMBER_OF_TRACKS}
                  register={register}
                  placeholder="Number of tracks"
              />
          ) : (
              <span className="medium text-end">{selectedAlbum?.number_of_tracks}</span>
          )}
          <b className="caption">Release source</b>
          {mode ? (
              <Select
                  placeholder="Choose format"
                  selectedOption={isCreateMode ? newAlbum?.format_name : selectedAlbum?.format_name}
                  setSelectedOption={(value) => handleFieldsOnChange(ALBUM_FIELDS.FORMAT_NAME, value)}
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
                  setSelectedOption={(value) => handleFieldsOnChange(ALBUM_FIELDS.GENRE_NAME, value)}
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
