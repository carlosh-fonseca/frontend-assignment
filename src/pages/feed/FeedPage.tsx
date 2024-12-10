import { Feed } from "../../views/feed/Feed";
import { ContentLayout } from "../contentLayout/ContentLayout";

export function FeedPage() {
  return (
    <ContentLayout title="Feed">
      <Feed />
    </ContentLayout>
  );
}
