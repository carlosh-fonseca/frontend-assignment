import {
  fetchAlbumsRepository,
  PhotoPostRequest,
  postNewPhotoRepository,
} from './AddPhotoRepository';

interface PostPhotoServiceProps {
  photo: PhotoPostRequest;
  fakeError?: boolean;
}

export const postNewPhotoService = async (params: PostPhotoServiceProps) => {
  if (params.fakeError) {
    throw new Error('Fake error');
  }
  const { data } = await postNewPhotoRepository(params.photo);
  return data;
};

export const fetchAlbumsService = async (userId: number) => {
  const { data } = await fetchAlbumsRepository(userId);
  return data;
};
