import { useCallback, useContext, useEffect, useState } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { DeleteIcon } from '../../shared/assets/icons/DeleteIcon';
import { IconButton } from '../../shared/components/IconButton/IconButton';
import { PhotoBox } from '../../shared/components/PhotoBox/PhotoBox';
import { ListSkeleton } from '../../shared/components/Skeleton/Skeleton';
import { ApiContext, FakeApiState } from '../../shared/context/ApiContext';
import { useAlert } from '../../shared/hooks/useAlert';
import { useAuth } from '../../shared/hooks/useAuth';
import { useLoadData } from '../../shared/hooks/useLoadData';
import { useSendData } from '../../shared/hooks/useSendData';
import {
  Album,
  deleteAlbumService,
  fetchAlbumsService,
  UserAlbums,
} from './api/AlbumsService';

export function Albums() {
  const { userId } = useParams<{ userId: string }>();
  const { apiState, setApiState } = useContext(ApiContext);
  const { openAlert } = useAlert();

  const { data: userAlbums, isLoading } = useLoadData<UserAlbums>(
    ['albums', userId],
    () => fetchAlbumsService(Number(userId)),
  );

  const { albums, user } = userAlbums || ({} as UserAlbums);

  const [albumsToShow, setAlbumsToShow] = useState<Album[]>([]);

  const getFilteredAlbums = (albums: Album[], apiState: FakeApiState) => {
    return [
      ...apiState.addedAlbums.filter(
        (album) => !apiState.deletedAlbums.includes(album.id),
      ),
      ...albums.filter((album) => !apiState.deletedAlbums.includes(album.id)),
    ];
  };

  useEffect(() => {
    if (albums) {
      setAlbumsToShow(getFilteredAlbums(albums, apiState));
    }
  }, [userAlbums, apiState.deletedAlbums, apiState.addedAlbums]);

  const { mutate: deleteAlbum } = useSendData(
    deleteAlbumService,
    (deletedAlbum) => {
      if (deletedAlbum)
        setApiState((currentState) => ({
          ...currentState,
          deletedAlbums: [...currentState.deletedAlbums, deletedAlbum!],
        }));
      openAlert({ message: 'Album deleted' });
    },
    () => openAlert({ message: 'Failed to delete album', type: 'error' }),
  );

  const myOwnPage = useAuth(userId);

  const handleDeleteAlbum = useCallback(
    (e: React.MouseEvent<HTMLElement>, albumId: number) => {
      e.preventDefault();
      deleteAlbum(albumId);
    },
    [deleteAlbum],
  );

  if (isLoading) {
    return (
      <>
        <header>
          <h1 className="text-center mt-4">
            {myOwnPage ? 'My Albums' : `${user?.username} Albums`}
          </h1>
        </header>
        <div className="flex flex-wrap gap-8 mt-4 flex-col md:flex-row">
          <ListSkeleton numberElements={12} />
        </div>
      </>
    );
  }

  return (
    <>
      <header>
        <h1 className="text-center mt-4">
          {myOwnPage ? 'My Albums' : `${user?.username} Albums`}
        </h1>
      </header>
      <div className="flex flex-wrap gap-8 mt-4 flex-col md:flex-row">
        {albumsToShow?.map((album) => (
          <NavLink
            key={album.id}
            to={`albums/${album.id}`}
            className="mx-auto w-2/4 md:w-2/12"
          >
            <PhotoBox
              key={album.id}
              src={album.coverPhoto}
              alt={album.title}
              caption={album.title}
              actions={
                myOwnPage && (
                  <IconButton
                    icon={<DeleteIcon />}
                    title="Delete"
                    onClick={(e: React.MouseEvent<HTMLElement>) =>
                      handleDeleteAlbum(e, album.id)
                    }
                  />
                )
              }
            />
          </NavLink>
        ))}
      </div>
    </>
  );
}
