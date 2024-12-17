import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { beforeEach, describe, expect, Mock, test, vi } from 'vitest';
import { Album } from './Album';
import { ApiContext } from '../../shared/context/ApiContext';
import { useAlert } from '../../shared/hooks/useAlert';
import { useAuth } from '../../shared/hooks/useAuth';
import { useLoadData } from '../../shared/hooks/useLoadData';
import { useSendData } from '../../shared/hooks/useSendData';
import { fetchPhotosService, deletePhotoService } from './api/AlbumService';

vi.mock('../../shared/hooks/useAlert');
vi.mock('../../shared/hooks/useAuth');
vi.mock('../../shared/hooks/useLoadData');
vi.mock('../../shared/hooks/useSendData');
vi.mock('./api/AlbumService');

describe('Album', () => {
  const mockApiState = {
    addedPhotos: [],
    deletedPhotos: [],
    addedAlbums: [],
    deletedAlbums: [],
  };

  const mockSetApiState = vi.fn();
  const mockOpenAlert = vi.fn();
  const mockUseAuth = vi.fn();
  const mockFetchPhotosService = vi.fn();
  const mockDeletePhotoService = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    (useAlert as Mock).mockReturnValue({
      openAlert: mockOpenAlert,
    });
    (useAuth as Mock).mockReturnValue(mockUseAuth);
    (useLoadData as Mock).mockReturnValue({
      data: [],
      isLoading: false,
    });
    (useSendData as Mock).mockReturnValue({
      mutate: mockDeletePhotoService,
    });

    (fetchPhotosService as Mock).mockImplementation(mockFetchPhotosService);

    (deletePhotoService as Mock).mockImplementation(mockDeletePhotoService);
  });

  test('renders loading state', () => {
    (useLoadData as Mock).mockReturnValue({
      data: [],
      isLoading: true,
    });

    render(
      <ApiContext.Provider
        value={{ apiState: mockApiState, setApiState: mockSetApiState }}
      >
        <MemoryRouter initialEntries={['/users/1/albums/1']}>
          <Routes>
            <Route path="/users/:userId/albums/:albumId" element={<Album />} />
          </Routes>
        </MemoryRouter>
      </ApiContext.Provider>,
    );

    expect(screen.getAllByTestId('skeleton-id')).toHaveLength(12);
  });

  test('renders photos', () => {
    const mockPhotos = [
      { id: '1', url: 'photo1.jpg', title: 'Photo 1' },
      { id: '2', url: 'photo2.jpg', title: 'Photo 2' },
    ];

    (useLoadData as Mock).mockReturnValue({
      data: mockPhotos,
      isLoading: false,
    });

    render(
      <ApiContext.Provider
        value={{ apiState: mockApiState, setApiState: mockSetApiState }}
      >
        <MemoryRouter initialEntries={['/users/1/albums/1']}>
          <Routes>
            <Route path="/users/:userId/albums/:albumId" element={<Album />} />
          </Routes>
        </MemoryRouter>
      </ApiContext.Provider>,
    );

    expect(screen.getByText('Photo 1')).toBeTruthy();
    expect(screen.getByText('Photo 2')).toBeTruthy();
  });

  test('deletes a photo', () => {
    const mockPhotos = [{ id: '1', url: 'photo1.jpg', title: 'Photo 1' }];

    (useLoadData as Mock).mockReturnValue({
      data: mockPhotos,
      isLoading: false,
    });

    (useAuth as Mock).mockReturnValue(true);

    render(
      <ApiContext.Provider
        value={{ apiState: mockApiState, setApiState: mockSetApiState }}
      >
        <MemoryRouter initialEntries={['/users/1/albums/1']}>
          <Routes>
            <Route path="/users/:userId/albums/:albumId" element={<Album />} />
          </Routes>
        </MemoryRouter>
      </ApiContext.Provider>,
    );

    fireEvent.click(screen.getByTestId('photo-box-delete-icon-1'));

    expect(mockDeletePhotoService).toHaveBeenCalledWith('1');
  });
});
