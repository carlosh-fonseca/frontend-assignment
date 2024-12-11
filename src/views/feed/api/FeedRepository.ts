import { httpClient } from '../../../core/axios/axios';

interface AlbumResponse {
  id: number;
  title: string;
  user: {
    id: number;
    name: string;
    username: string;
  };
  photos: {
    id: number;
    url: string;
    title: string;
    thumbnailUrl: string;
  }[];
}

export const getPhotosRepository = async () => {
  return await httpClient.get<AlbumResponse[]>(
    'albums?_expand=user&_embed=photos',
  );
};
