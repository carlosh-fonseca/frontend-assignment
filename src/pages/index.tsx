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
  component: <h1 className="text-3xl font-bold underline">Hello world!</h1>,
  name: "Feed",
  id: "feed",
  path: "/",
};

export const pages: PageConfig[] = [myAlbumsConfig, homeConfig];
