import { PhotoBox } from "../../shared/components/PhotoBox/PhotoBox";
import { useLoadDados } from "../../shared/hooks/useLoadDados";
import { getPhotosService } from "./api/FeedService";

export interface Photo {
  id: string;
  url: string;
  title: string;
  user: {
    id: number;
    name: string;
    username: string;
  };
}

export function Feed() {
  const { data } = useLoadDados<Photo[]>(["photos"], getPhotosService);

  return (
    <div>
      {data?.map((photo) => (
        <PhotoBox
          key={photo.id}
          src={photo.url}
          alt={photo.title}
          caption={photo.title}
          authorName={photo.user.name}
          authorUsername={photo.user.username}
        />
      ))}
    </div>
  );
}
