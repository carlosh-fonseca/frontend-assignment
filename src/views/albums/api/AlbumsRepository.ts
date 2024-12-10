import { httpClient } from "../../../core/axios/axios";

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

export const fetchAlbumsRepository = async (userId: number) => {
  return await httpClient.get<AlbumResponse[]>(
    `users/${userId}/albums?_embed=photos`
  );
};
