import { Photo } from "../../feed/Feed";
import { fetchPhotosRepository } from "./AlbumRepository";

export const fetchPhotosService = async (albumId: number): Promise<Photo[]> => {
  const { data } = await fetchPhotosRepository(albumId);

  return data;
};
