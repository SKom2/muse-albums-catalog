import {FC} from 'react';
import { IMode } from "@/components/Album/AlbumContainer.tsx";
import { FieldValues, UseFormSetValue } from "react-hook-form";
import MetaTable from "@/components/MetaTable/MetaTable.tsx";

const AlbumMeta: FC<{
  mode: IMode;
  register: any;
  handleFieldsOnChange: (name: string, value: string) => void;
  setValue: UseFormSetValue<FieldValues>
}> = ({ mode, register, handleFieldsOnChange, setValue }) => {
  return (
      <div className="h-fit w-full p-6 bg-screen-default shadow-2xl rounded-lg max-sm:p-4">
        <MetaTable mode={mode}
                   register={register}
                   setValue={setValue}
                   handleFieldsOnChange={handleFieldsOnChange} />
      </div>
  );
};

export default AlbumMeta;
