import { albumConfig } from "./album";
import { albumsConfig } from "./albums";
import { feedConfig } from "./feed";

export interface PageConfig {
  component: JSX.Element;
  name: string;
  id: string;
  path: string;
}

export const pages: PageConfig[] = [albumsConfig, feedConfig, albumConfig];
