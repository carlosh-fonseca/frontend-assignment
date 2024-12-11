import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { DeleteIcon } from '../../shared/assets/icons/DeleteIcon';
import { IconButton } from '../../shared/components/IconButton/IconButton';
import { PhotoBox } from '../../shared/components/PhotoBox/PhotoBox';
import { ApiContext } from '../../shared/context/ApiContext';
import { useAlert } from '../../shared/hooks/useAlert';
import { useAuth } from '../../shared/hooks/useAuth';
import { useLoadData } from '../../shared/hooks/useLoadData';
import { useSendData } from '../../shared/hooks/useSendData';
import { Photo } from '../feed/Feed';
import { deletePhotoService, fetchPhotosService } from './api/AlbumService';

export function Album() {
  const { userId, albumId } = useParams<{ userId: string; albumId: string }>();

  const { apiState, setApiState } = useContext(ApiContext);
  const { openAlert } = useAlert();

  const { data: photos } = useLoadData<Photo[]>(['photos'], () =>
    fetchPhotosService(Number(albumId)),
  );

  const myOwnPage = useAuth(userId);

  const { mutate: deletePhoto } = useSendData(
    deletePhotoService,
    (deletedPhoto) => {
      if (deletedPhoto)
        setApiState((currentState) => ({
          ...currentState,
          deletedPhotos: [...currentState.deletedPhotos, deletedPhoto!],
        }));
      openAlert({ message: 'Photo deleted' });
    },
    () => openAlert({ message: 'Failed to delete photo', type: 'error' }),
  );

  const handleDeletePhoto = (
    e: React.MouseEvent<HTMLElement>,
    photoId: number,
  ) => {
    e.preventDefault();
    deletePhoto(photoId);
  };

  const [photosToShow, setPhotosToShow] = useState<Photo[]>([]);
  useEffect(() => {
    if (photos) {
      setPhotosToShow([
        ...apiState.addedPhotos.filter(
          (photo) =>
            photo.albumId === Number(albumId) &&
            !apiState.deletedPhotos.includes(photo.id),
        ),
        ...photos.filter((photo) => !apiState.deletedPhotos.includes(photo.id)),
      ]);
    }
  }, [photos, apiState.deletedPhotos, apiState.addedPhotos]);

  return (
    <div className="flex flex-wrap gap-8 mt-4 flex-col md:flex-row">
      {photosToShow?.map((photo) => (
        <div className="mx-auto w-3/4 md:w-3/12 lg:w-2/12" key={photo.id}>
          <PhotoBox
            key={photo.id}
            src={photo.url}
            alt={photo.title}
            caption={photo.title}
            actions={
              myOwnPage && (
                <IconButton
                  icon={<DeleteIcon />}
                  title="Delete"
                  onClick={(e: React.MouseEvent<HTMLElement>) =>
                    handleDeletePhoto(e, photo.id)
                  }
                />
              )
            }
          />
        </div>
      ))}
    </div>
  );
}
