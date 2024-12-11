import { Photo } from '../Feed';
import { getPhotosRepository } from './FeedRepository';

export const getPhotosService = async (): Promise<Photo[]> => {
  const { data } = await getPhotosRepository();
  const feedArray = data.reduce((acc, album) => {
    return [
      ...acc,
      ...album.photos.map(
        (photo) =>
          ({
            id: `${album.id}-${photo.id}`,
            url: photo.url,
            title: photo.title,
            thumbnailUrl: photo.thumbnailUrl,
            albumId: album.id,
            user: {
              id: album.user.id,
              name: album.user.name,
              username: album.user.username,
            },
          }) as Photo,
      ),
    ];
  }, [] as Photo[]);
  return shuffle(feedArray).slice(0, 100);
};

const shuffle = (array: Photo[]) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};
