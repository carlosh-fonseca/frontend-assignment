import { Album } from '../../views/album/Album';
import { ContentLayout } from '../contentLayout/ContentLayout';

export function AlbumPage() {
  return (
    <ContentLayout title="Album">
      <Album />
    </ContentLayout>
  );
}
