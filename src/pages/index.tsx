import { addPhotoConfig } from './addPhoto';
import { albumConfig } from './album';
import { feedConfig } from './feed';
import { userConfig } from './user';

export interface PageConfig {
  component: JSX.Element;
  name: string;
  id: string;
  path: string;
}

export const pages: PageConfig[] = [
  feedConfig,
  albumConfig,
  userConfig,
  addPhotoConfig,
];
