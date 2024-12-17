import {
  afterEach,
  beforeEach,
  describe,
  expect,
  Mock,
  test,
  vi,
} from 'vitest';
import { cleanup, render, screen } from '@testing-library/react';

import { MemoryRouter } from 'react-router-dom';
import { Albums } from './Albums';
import { ReactNode } from 'react';
import { ModalProvider } from '../../shared/context/ModalContext';
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from '@tanstack/react-query';
import { AlertProvider } from '../../shared/context/AlertContext';
import { useAuth } from '../../shared/hooks/useAuth';

vi.mock('@tanstack/react-query', async () => {
  const actual = await vi.importActual('@tanstack/react-query');
  return {
    ...actual,
    useQuery: vi.fn(),
  };
});
vi.mock('../../shared/hooks/useAuth', () => ({
  useAuth: vi.fn(),
}));

export const queryClient = new QueryClient();
const ProviderWrapper = ({ children }: { children: ReactNode }) => (
  <MemoryRouter initialEntries={['/']}>
    <QueryClientProvider client={queryClient}>
      <ModalProvider>
        <AlertProvider>{children}</AlertProvider>
      </ModalProvider>
    </QueryClientProvider>
  </MemoryRouter>
);

const mockAlbumsReturn = {
  user: {
    id: 1,
    name: 'Test User 1',
    username: 'testuser1',
  },
  albums: [
    {
      id: 1,
      title: 'Test 1',
      coverPhoto: 'http://thumb/test.1',
    },
    {
      id: 2,
      title: 'Test 2',
      coverPhoto: 'http://thumb/test.2',
    },
    {
      id: 3,
      title: 'Test 3',
      coverPhoto: 'http://thumb/test.3',
    },
  ],
};

describe('Albums', () => {
  beforeEach(() => {});
  afterEach(() => {
    cleanup();
  });

  test('renders skeleton correctly', () => {
    (useQuery as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      data: null,
      isLoading: true,
      error: null,
    });

    const { getAllByTestId } = render(<Albums />, { wrapper: ProviderWrapper });
    expect(getAllByTestId('skeleton-id')).toBeTruthy();
    expect(getAllByTestId('skeleton-id')).toHaveLength(12);
  });

  test('renders my albums correctly', () => {
    (useAuth as Mock).mockReturnValue(true);

    (useQuery as Mock).mockReturnValue({
      data: mockAlbumsReturn,
      isLoading: false,
      error: null,
    });

    render(<Albums />, {
      wrapper: ProviderWrapper,
    });

    expect(screen.getByTestId('albums-title')).toHaveTextContent('My Albums');

    expect(screen.getByTestId('album-box-1-wrapper')).toBeTruthy();
    expect(screen.getByTestId('album-box-1-img')).toBeTruthy();
    expect(screen.getByTestId('album-box-1-img')).toHaveProperty(
      'src',
      'http://thumb/test.1',
    );
    expect(screen.getByTestId('album-box-delete-icon-1')).toBeTruthy();

    expect(screen.getByTestId('album-box-2-wrapper')).toBeTruthy();
    expect(screen.getByTestId('album-box-2-img')).toBeTruthy();
    expect(screen.getByTestId('album-box-2-img')).toHaveProperty(
      'src',
      'http://thumb/test.2',
    );
    expect(screen.getByTestId('album-box-delete-icon-2')).toBeTruthy();

    expect(screen.getByTestId('album-box-3-wrapper')).toBeTruthy();
    expect(screen.getByTestId('album-box-3-img')).toBeTruthy();
    expect(screen.getByTestId('album-box-3-img')).toHaveProperty(
      'src',
      'http://thumb/test.3',
    );
    expect(screen.getByTestId('album-box-delete-icon-3')).toBeTruthy();
  });

  test('renders another users albums correctly', () => {
    (useAuth as Mock).mockReturnValue(false);

    (useQuery as Mock).mockReturnValue({
      data: mockAlbumsReturn,
      isLoading: false,
      error: null,
    });

    render(<Albums />, {
      wrapper: ProviderWrapper,
    });

    expect(screen.getByTestId('albums-title')).toHaveTextContent(
      'testuser1 Albums',
    );

    expect(screen.getByTestId('album-box-1-wrapper')).toBeTruthy();
    expect(screen.getByTestId('album-box-1-img')).toBeTruthy();
    expect(screen.getByTestId('album-box-1-img')).toHaveProperty(
      'src',
      'http://thumb/test.1',
    );
    expect(screen.queryByTestId('album-box-delete-icon-1')).not.toBeTruthy();

    expect(screen.getByTestId('album-box-2-wrapper')).toBeTruthy();
    expect(screen.getByTestId('album-box-2-img')).toBeTruthy();
    expect(screen.getByTestId('album-box-2-img')).toHaveProperty(
      'src',
      'http://thumb/test.2',
    );
    expect(screen.queryByTestId('album-box-delete-icon-2')).not.toBeTruthy();

    expect(screen.getByTestId('album-box-3-wrapper')).toBeTruthy();
    expect(screen.getByTestId('album-box-3-img')).toBeTruthy();
    expect(screen.getByTestId('album-box-3-img')).toHaveProperty(
      'src',
      'http://thumb/test.3',
    );
    expect(screen.queryByTestId('album-box-delete-icon-3')).not.toBeTruthy();
  });
});
