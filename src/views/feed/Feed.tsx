import { PhotoBox } from '../../shared/components/PhotoBox/PhotoBox';
import { ListSkeleton } from '../../shared/components/Skeleton/Skeleton';
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
  const { data, isLoading } = useLoadData<Photo[]>(
    ['photos'],
    getPhotosService,
  );

  if (isLoading) {
    return (
      <div className="flex flex-col gap-8 mx-auto my-16 ">
        <ListSkeleton numberElements={12} />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8 mx-auto my-16 ">
      {data?.map((photo: Photo) => (
        <div
          className="mx-auto w-3/4 md:w-2/4 lg:w-4/12 xl:w-3/12"
          key={photo.id}
        >
          <PhotoBox
            src={photo.url}
            alt={photo.title}
            caption={photo.title}
            authorName={photo.user?.name}
            authorUsername={photo.user?.username}
            authorId={photo.user?.id}
          />
        </div>
      ))}
    </div>
  );
}
