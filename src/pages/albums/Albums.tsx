import { Albums } from "../../views/albums/Albums";
import { ContentLayout } from "../contentLayout/ContentLayout";

export function AlbumsPage() {
  return (
    <ContentLayout title="My Albums">
      <Albums />
    </ContentLayout>
  );
}
