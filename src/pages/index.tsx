import { Feed } from "../views/feed/Feed";

export interface PageConfig {
  component: JSX.Element;
  name: string;
  id: string;
  path: string;
}

const myAlbumsConfig = {
  component: <p>My Albums</p>,
  name: "My Albums",
  id: "MyAlbums",
  path: "/my-albums",
};

const homeConfig = {
  component: <Feed />,
  name: "Feed",
  id: "feed",
  path: "/",
};

export const pages: PageConfig[] = [myAlbumsConfig, homeConfig];
