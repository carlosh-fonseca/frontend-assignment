import { httpClient } from '../../../core/axios/axios';
import { Photo } from '../../feed/Feed';

export const fetchPhotosRepository = async (albumId: number) => {
  return await httpClient.get<Photo[]>(`albums/${albumId}/photos`);
};

export const deletePhotoRepository = async (photoId: string) => {
  return await httpClient.delete(`photos/${photoId}`);
};
