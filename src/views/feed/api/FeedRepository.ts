import { httpClient } from '../../../core/axios/axios';
import { User } from '../../albums/api/AlbumsService';
import { Photo } from '../Feed';

export const getPhotosRepository = async (page: number) => {
  return await httpClient.get<Photo[]>(`photos?_page=${page}&_per_page=10`);
};
export const getUsersRepository = async () => {
  return await httpClient.get<User[]>('users');
};
