import { Photo } from '../../feed/Feed';
import {
  deletePhotoRepository,
  fetchPhotosRepository,
} from './AlbumRepository';

export const fetchPhotosService = async (albumId: number): Promise<Photo[]> => {
  const { data } = await fetchPhotosRepository(albumId);

  return data;
};

export const deletePhotoService = async (photoId: number) => {
  try {
    await deletePhotoRepository(photoId);
    return photoId;
  } catch (error) {
    throw new Error((error as Error).message ?? 'Failed to delete');
  }
};
