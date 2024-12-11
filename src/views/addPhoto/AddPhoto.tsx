import { useContext, useState } from 'react';
import { ApiContext } from '../../shared/context/ApiContext';
import { useAlert } from '../../shared/hooks/useAlert';
import { useLoadData } from '../../shared/hooks/useLoadData';
import { useModal } from '../../shared/hooks/useModal';
import { useSendData } from '../../shared/hooks/useSendData';
import { generateRandomId } from '../../shared/utils/number';
import { Album } from '../albums/api/AlbumsService';
import { Photo } from '../feed/Feed';
import { fetchAlbumsService, postNewPhotoService } from './api/AddPhotoService';

export function AddPhoto() {
  const { closeModal } = useModal();
  const { openAlert } = useAlert();
  const { setApiState } = useContext(ApiContext);

  const [formState, setFormState] = useState({
    url: '',
    title: '',
    isExistingAlbum: false,
    nameNewAlbum: '',
    existingAlbum: 1,
  });

  const updateApiState = (res: Photo) => {
    setApiState((currentState) => {
      let newAddedAlbums = [...currentState.addedAlbums];
      if (!formState.isExistingAlbum) {
        newAddedAlbums = [
          {
            id: res.albumId,
            title: formState.nameNewAlbum,
            coverPhoto: res.url,
          },
          ...currentState.addedAlbums,
        ];
      }
      return {
        ...currentState,
        addedAlbums: newAddedAlbums,
        addedPhotos: [
          {
            albumId: res.albumId,
            id: res.id,
            title: res.title,
            url: res.url,
            thumbnailUrl: res.url,
          },
          ...currentState.addedPhotos,
        ],
      };
    });
  };

  const { mutate: postNewPhoto } = useSendData(
    postNewPhotoService,
    (res: Photo) => {
      updateApiState(res);
      openAlert({ message: 'Photo added successfully', type: 'success' });
    },
    () => {
      openAlert({ message: 'Failed to add photo', type: 'error' });
    },
  );

  const { data: albums } = useLoadData<Album[]>(['albums'], () =>
    fetchAlbumsService(1),
  );

  const onClickAddPhoto = (isError = false) => {
    const randomNewAlbumId = generateRandomId();
    postNewPhoto({
      photo: {
        title: formState.title,
        url: formState.url,
        albumId: formState.isExistingAlbum
          ? Number(formState.existingAlbum)
          : randomNewAlbumId,
      },
      fakeError: isError,
    });
    closeModal();
  };

  return (
    <div className="flex flex-col">
      <div className="my-2">
        <label htmlFor="url-new-photo">URL: </label>
        <input
          className="border rounded border-slate-400"
          id="url-new-photo"
          type="text"
          value={formState.url}
          onChange={(e) => setFormState({ ...formState, url: e.target.value })}
        />
      </div>
      <div className="my-2">
        <label htmlFor="title-new-photo">Title: </label>
        <input
          className="border rounded border-slate-400"
          id="title-new-photo"
          type="text"
          value={formState.title}
          onChange={(e) =>
            setFormState({ ...formState, title: e.target.value })
          }
        />
      </div>
      <div className="my-2">
        <label htmlFor="is-existing-album">Existing album? </label>
        <input
          id="is-existing-album"
          type="checkbox"
          checked={formState.isExistingAlbum}
          onChange={() => {
            if (!formState.isExistingAlbum)
              setFormState({ ...formState, nameNewAlbum: '' });
            setFormState({
              ...formState,
              isExistingAlbum: !formState.isExistingAlbum,
            });
          }}
        />
      </div>
      <div className="my-2">
        <label htmlFor="title-new-album">Album: </label>
        <input
          className="border rounded border-slate-400"
          id="title-new-album"
          type="text"
          value={formState.nameNewAlbum}
          onChange={(e) =>
            setFormState({ ...formState, nameNewAlbum: e.target.value })
          }
          disabled={formState.isExistingAlbum}
        />
      </div>
      <div className="my-2">
        <label htmlFor="existing-album">Album: </label>
        <select
          id="existing-album"
          value={formState.existingAlbum}
          disabled={!formState.isExistingAlbum}
          onChange={(e) =>
            setFormState({
              ...formState,
              existingAlbum: Number(e.target.value),
            })
          }
        >
          {albums?.map((album: Album) => (
            <option key={album.id} value={album.id}>
              {album.title}
            </option>
          ))}
        </select>
      </div>
      <button className="m-auto mt-4" onClick={() => onClickAddPhoto()}>
        Add
      </button>
      <button className="m-auto mt-4" onClick={() => onClickAddPhoto(true)}>
        Fake error
      </button>
    </div>
  );
}
