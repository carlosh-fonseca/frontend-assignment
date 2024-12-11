import { createContext } from 'react';
import { Album } from '../../views/albums/api/AlbumsService';
import { Photo } from '../../views/feed/Feed';

export interface FakeApiState {
  addedPhotos: Photo[];
  deletedPhotos: string[];
  addedAlbums: Album[];
  deletedAlbums: number[];
}

interface FakeApiContextValue {
  apiState: FakeApiState;
  setApiState: React.Dispatch<React.SetStateAction<FakeApiState>>;
}

export const initialState = {
  addedPhotos: [],
  deletedPhotos: [],
  addedAlbums: [],
  deletedAlbums: [],
};

export const ApiContext = createContext<FakeApiContextValue>({
  apiState: initialState,
  setApiState: () => {},
});
