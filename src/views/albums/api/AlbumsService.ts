import { Photo } from "../Feed";
import { fetchAlbumsRepository } from "./AlbumsRepository";

export const fetchAlbumsService = async (userId: number): Promise<Photo[]> => {
  const { data } = await fetchAlbumsRepository(userId);

  const albumsWithThumbnail = data.map((album) => ({
    ...album,
    coverPhoto: album.photos[0].thumbnailUrl,
  }));

  return albumsWithThumbnail;
};
