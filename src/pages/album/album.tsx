import { Album } from "../../views/album/CAlbum";
import { ContentLayout } from "../contentLayout/ContentLayout";

export function AlbumPage() {
  return (
    <ContentLayout title="Album">
      <Album />
    </ContentLayout>
  );
}
