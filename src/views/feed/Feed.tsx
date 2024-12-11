import { useEffect, useState } from 'react';
import { PhotoBox } from '../../shared/components/PhotoBox/PhotoBox';
import { ListSkeleton } from '../../shared/components/Skeleton/Skeleton';
import { useLoadData } from '../../shared/hooks/useLoadData';
import { getPhotosService } from './api/FeedService';

export interface Photo {
  id: string;
  url: string;
  title: string;
  albumId: number;
  thumbnailUrl: string;
  user?: {
    id: number;
    name: string;
    username: string;
  };
}

export function Feed() {
  const [page, setPage] = useState(1);
  const [feedData, setFeedData] = useState<Photo[]>([]);
  const [nextPage, setNextPage] = useState(false);

  const { data, isLoading } = useLoadData<Photo[]>(['photos', page], () =>
    getPhotosService({ page }),
  );

  const handleScroll = () => {
    if (window.scrollY > document.body.scrollHeight - 1000) {
      setNextPage(true);
      console.log('bbbb');
    }
  };

  window.addEventListener('scroll', handleScroll);

  useEffect(() => {
    if (nextPage && !isLoading) {
      setPage((prevPage) => prevPage + 1);
    }
  }, [nextPage]);

  useEffect(() => {
    if (data) {
      setFeedData([...feedData, ...data]);
      setNextPage(false);
    }
  }, [data]);

  useEffect(() => () => setFeedData([]), []);

  if (isLoading) {
    return (
      <div className="flex flex-col gap-8 mx-auto my-16 ">
        <ListSkeleton numberElements={12} />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8 mx-auto my-16 ">
      {feedData?.map((photo: Photo) => (
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
