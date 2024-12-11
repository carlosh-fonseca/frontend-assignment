import { AddPhoto } from '../../views/addPhoto/AddPhoto';
import { ContentLayout } from '../contentLayout/ContentLayout';

export function AddPhotoPage() {
  return (
    <ContentLayout title="Add New Photo">
      <AddPhoto />
    </ContentLayout>
  );
}
