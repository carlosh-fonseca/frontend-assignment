import { httpClient } from '../../../core/axios/axios';
import { Photo } from '../../feed/Feed';

export interface PhotoPostRequest {
  url: string;
  albumId: number;
  title: string;
}

export const postNewPhotoRepository = async (photo: PhotoPostRequest) => {
  return await httpClient.post<Photo>('photos', {
    url: photo.url,
    albumId: photo.albumId,
    title: photo.title,
  });
};

export const fetchAlbumsRepository = async (userId: number) => {
  return await httpClient.get(`albums?userId=${userId}`);
};
