import {useForm} from "react-hook-form";
import useAlbumsStore from "@/services/zustand/albums/albums.store.ts";
import {FormEvent, useEffect} from "react";
import {IMode} from "@/components/Album/AlbumContainer.tsx";
import toast from "react-hot-toast";
import {useParams} from "react-router-dom";
import {IAlbumFormFieldsValues} from "@/services/zustand/albums/albums.types.ts";

export const useAlbumEditor = ({ mode }: { mode: IMode }) => {
    const isCreateMode = mode === 'create';

    const { albumId } = useParams();
    const { register, watch } = useForm<IAlbumFormFieldsValues>();

    const uploadAlbumCover = useAlbumsStore(state => state.uploadAlbumCover)
    const submitAlbumChanges = useAlbumsStore(state => state.submitAlbumChanges)

    useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name && value[name]) handleFieldsOnChange(name, value[name].toString())
        })

        return () => subscription.unsubscribe()
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

        if (!albumData) return; // If the album is not selected or not created, we do nothing

        const {
            date_of_issue,
            number_of_tracks,
            format_name,
            genre_name,
            cover,
            description = "BLa",
            name,
            artist_name = "Future"
        } = albumData;

        if (!date_of_issue || !number_of_tracks || !format_name || !genre_name || !cover || !name || !artist_name) return;

        const payload = {
            name,
            cover,
            artist_name,
            date_of_issue,
            number_of_tracks,
            format_name,
            genre_name,
            description,
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
    };
};