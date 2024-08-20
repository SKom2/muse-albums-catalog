import {useForm} from "react-hook-form";
import useAlbumsStore from "@/services/zustand/albums/albums.store.ts";
import {FormEvent, useEffect} from "react";
import {IMode} from "@/components/Album/AlbumContainer.tsx";
import toast from "react-hot-toast";
import {useParams} from "react-router-dom";
import {IAlbumFormFieldsValues} from "@/services/zustand/albums/albums.types.ts";
import useAuthStore from "@/services/zustand/auth/auth.store.ts";

export const ALBUM_FIELDS = {
    NAME: 'name',
    ARTIST_NAME: 'artist_name',
    DATE_OF_ISSUE: 'date_of_issue',
    NUMBER_OF_TRACKS: 'number_of_tracks',
    FORMAT_NAME: 'format_name',
    GENRE_NAME: 'genre_name',
    COVER: 'cover',
    DESCRIPTION: 'description',
};

export const useAlbumEditor = ({ mode }: { mode: IMode }) => {
    const isCreateMode = mode === 'create';
    const { albumId } = useParams();
    const { register, watch, setValue } = useForm<IAlbumFormFieldsValues>();

    const uploadAlbumCover = useAlbumsStore(state => state.uploadAlbumCover);
    const submitAlbumChanges = useAlbumsStore(state => state.submitAlbumChanges);

    useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name && value[name]) handleFieldsOnChange(name, value[name].toString());
        });

        return () => subscription.unsubscribe();
    }, [watch]);

    const handleFileSelect = async (file: File) => {
        await uploadAlbumCover(file, mode);
    };

    const handleFieldsOnChange = (name: string, value: string) => {
        const updateAlbum = isCreateMode ? 'newAlbum' : 'selectedAlbum';
        useAlbumsStore.setState(state => ({
            [updateAlbum]: { ...state[updateAlbum], [name]: value }
        }));
    };

    const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const state = useAlbumsStore.getState();
        const albumData = isCreateMode ? state.newAlbum : state.selectedAlbum;

        let user_id
        if (isCreateMode) {
            user_id = useAuthStore.getState().user?.id
        }

        if (!albumData) return;

        const {
            name,
            cover,
            artist_name,
            date_of_issue,
            number_of_tracks,
            format_name,
            genre_name,
            description = "Hi",
        } = albumData;

        if (!cover) {
            toast.error("Please upload the cover image")
            return
        }

        if (!date_of_issue || !number_of_tracks || !format_name || !genre_name || !name || !artist_name) {
            toast.error("Please fill out all fields")
            return;
        }

        const payload = {
            name,
            cover,
            artist_name,
            date_of_issue,
            number_of_tracks,
            format_name,
            genre_name,
            description,
            user_id
        };

        await toast.promise(
            submitAlbumChanges(payload, albumId),
            {
                loading: <b>Loading...</b>,
                success: <b>Settings saved!</b>,
                error: <b>Could not save.</b>,
            }
        );
    };

    return {
        register,
        handleSubmit: onSubmit,
        handleFieldsOnChange,
        handleFileSelect,
        setValue
    };
};
