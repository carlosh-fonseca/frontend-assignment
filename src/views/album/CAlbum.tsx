import { useParams } from "react-router-dom";
import { PhotoBox } from "../../shared/components/PhotoBox/PhotoBox";
import { useLoadDados } from "../../shared/hooks/useLoadDados";
import { Photo } from "../feed/Feed";
import { fetchPhotosService } from "./api/AlbumService";

export function Album() {
  const { albumId } = useParams<{ albumId: string }>();

  const { data: photos } = useLoadDados<Photo[]>(["photos"], () =>
    fetchPhotosService(Number(albumId))
  );

  return (
    <div>
      {photos?.map((photo) => (
        <PhotoBox
          key={photo.id}
          src={photo.url}
          alt={photo.title}
          caption={photo.title}
        />
      ))}
    </div>
  );
}
