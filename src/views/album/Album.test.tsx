import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { Album } from './Album';
import { ApiContext } from '../../shared/context/ApiContext';
import { useAlert } from '../../shared/hooks/useAlert';
import { useAuth } from '../../shared/hooks/useAuth';
import { useLoadData } from '../../shared/hooks/useLoadData';
import { useSendData } from '../../shared/hooks/useSendData';

vi.mock('../../shared/hooks/useAlert');
vi.mock('../../shared/hooks/useAuth');
vi.mock('../../shared/hooks/useLoadData');
vi.mock('../../shared/hooks/useSendData');
vi.mock('./api/AlbumService');

const useAlertMocked = vi.mocked(useAlert, true);
const useAuthMocked = vi.mocked(useAuth, true);
const useLoadDataMocked = vi.mocked(useLoadData, true);
const useSendDataMocked = vi.mocked(useSendData, true);

describe('Album Component', () => {
  const apiStateMock = {
    apiState: {
      addedPhotos: [],
      deletedPhotos: [],
      addedAlbums: [],
      deletedAlbums: [],
    },
    setApiState: vi.fn(),
  };

  const alertMock = {
    openAlert: vi.fn(),
    isOpen: false,
    type: 'success',
  };

  const photosMock = [
    { id: 1, albumId: 1, url: 'url1', title: 'title1' },
    { id: 2, albumId: 1, url: 'url2', title: 'title2' },
  ];

  const renderComponent = () => {
    return render(
      <BrowserRouter>
        <ApiContext.Provider value={apiStateMock}>
          <Album />
        </ApiContext.Provider>
      </BrowserRouter>,
    );
  };

  beforeEach(() => {
    apiStateMock.setApiState.mockClear();
    alertMock.openAlert.mockClear();
    useAuthMocked.mockReturnValue(true);
    useAlertMocked.mockReturnValue(alertMock);
    useLoadDataMocked.mockReturnValue({
      data: photosMock,
      isLoading: false,
    });
    useSendDataMocked.mockReturnValue({
      mutate: vi.fn(),
    });
  });

  it('should render loading state initially', () => {
    useLoadDataMocked.mockReturnValueOnce({
      data: null,
      isLoading: true,
    });

    renderComponent();

    expect(screen.getAllByTestId('skeleton-id')).toHaveLength(12);
  });

  it('should render photos when loading is complete', async () => {
    renderComponent();

    await waitFor(() => {
      expect(screen.getByAltText('title1')).toBeDefined();
      expect(screen.getByAltText('title2')).toBeDefined();
    });
  });
});
