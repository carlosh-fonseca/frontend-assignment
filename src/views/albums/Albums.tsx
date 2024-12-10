import { NavLink } from "react-router-dom";
import { PhotoBox } from "../../shared/components/PhotoBox/PhotoBox";
import { useLoadDados } from "../../shared/hooks/useLoadDados";
import { fetchAlbumsService } from "./api/AlbumsService";

export function Albums() {
  const { data: albums } = useLoadDados(["albums"], () =>
    fetchAlbumsService(1)
  );

  return (
    <li>
      {albums?.map((album) => (
        <ul>
          <NavLink to={`/albums/${album.id}`}>
            <PhotoBox
              key={album.id}
              src={album.coverPhoto}
              alt={album.title}
              caption={album.title}
            />
          </NavLink>
          ;
        </ul>
      ))}
    </li>
  );
}
