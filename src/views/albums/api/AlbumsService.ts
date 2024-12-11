import {
  deleteAlbumRepository,
  fetchAlbumsRepository,
} from './AlbumsRepository';

export interface Album {
  id: number;
  title: string;
  coverPhoto: string;
}
export interface UserAlbums {
  user: {
    id: number;
    name: string;
    username: string;
  };
  albums: Album[];
}

export const fetchAlbumsService = async (
  userId: number,
): Promise<UserAlbums> => {
  const { data } = await fetchAlbumsRepository(userId);
  const albumsWithThumbnail = data.map((album) => ({
    id: album.id,
    title: album.title,
    coverPhoto: album.photos[0].thumbnailUrl,
  }));

  return { user: data[0].user, albums: albumsWithThumbnail };
};

export const deleteAlbumService = async (albumId: number) => {
  try {
    await deleteAlbumRepository(albumId);
    return albumId;
  } catch (error) {
    throw new Error((error as Error).message ?? 'Failed to delete');
  }
};
