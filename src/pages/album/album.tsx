import { Album } from '../../views/album/album';
import { ContentLayout } from '../contentLayout/ContentLayout';

export function AlbumPage() {
  return (
    <ContentLayout title="Album">
      <Album />
    </ContentLayout>
  );
}
