import { PhotoBox } from '../../shared/components/PhotoBox/PhotoBox';
import { useLoadData } from '../../shared/hooks/useLoadData';
import { getPhotosService } from './api/FeedService';

export interface Photo {
  id: string;
  url: string;
  title: string;
  albumId: number;
  user?: {
    id: number;
    name: string;
    username: string;
  };
}

export function Feed() {
  const { data } = useLoadData<Photo[]>(['photos'], getPhotosService);

  return (
    <div className="flex flex-col gap-8 mx-auto my-16 w-3/4 md:w-2/4 lg:w-4/12 xl:w-3/12">
      {data?.map((photo) => (
        <PhotoBox
          key={photo.id}
          src={photo.url}
          alt={photo.title}
          caption={photo.title}
          authorName={photo.user?.name}
          authorUsername={photo.user?.username}
          authorId={photo.user?.id}
        />
      ))}
    </div>
  );
}
