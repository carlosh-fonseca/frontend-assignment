import { Photo } from '../Feed';
import { getPhotosRepository, getUsersRepository } from './FeedRepository';

export const getPhotosService = async ({
  page,
}: {
  page: number;
}): Promise<Photo[]> => {
  const { data: photos } = await getPhotosRepository(page);
  const { data: users } = await getUsersRepository();

  const feedArray = photos.map((photo) => ({
    id: `${photo.id}`,
    url: photo.url,
    title: photo.title,
    thumbnailUrl: photo.thumbnailUrl,
    albumId: photo.albumId,
    user: users.find((user) => user.id === photo.albumId),
  }));

  return shuffle(feedArray);
};

const shuffle = (array: Photo[]) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};
