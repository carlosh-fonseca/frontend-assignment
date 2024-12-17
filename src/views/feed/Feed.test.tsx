import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import { cleanup, render, screen } from '@testing-library/react';

import { MemoryRouter } from 'react-router-dom';
import { Feed } from './Feed';
import { ReactNode } from 'react';
import { ModalProvider } from '../../shared/context/ModalContext';
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from '@tanstack/react-query';

const mockFeedData = [
  {
    id: 1,
    title: 'Test 1',
    url: 'http://test.1',
    thumbnailUrl: 'http://thumb/test.1',
    user: {
      id: 1,
      name: 'Test User 1',
      username: 'testuser1',
    },
  },
  {
    id: 2,
    title: 'Test 2',
    url: 'http://test.2',
    thumbnailUrl: 'http://thumb/test.2',
    user: {
      id: 2,
      name: 'Test User 2',
      username: 'testuser2',
    },
  },
  {
    id: 3,
    title: 'Test 3',
    url: 'http://test.3',
    thumbnailUrl: 'http://thumb/test.3',
    user: {
      id: 3,
      name: 'Test User 3',
      username: 'testuser3',
    },
  },
];

vi.mock('@tanstack/react-query', async () => {
  const actual = await vi.importActual('@tanstack/react-query');
  return {
    ...actual,
    useQuery: vi.fn(),
  };
});

export const queryClient = new QueryClient();
const ProviderWrapper = ({ children }: { children: ReactNode }) => (
  <MemoryRouter initialEntries={['/']}>
    <QueryClientProvider client={queryClient}>
      <ModalProvider>{children}</ModalProvider>
    </QueryClientProvider>
  </MemoryRouter>
);

describe('Feed', () => {
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

    const { getAllByTestId } = render(<Feed />, { wrapper: ProviderWrapper });
    expect(getAllByTestId('skeleton-id')).toBeTruthy();
    expect(getAllByTestId('skeleton-id')).toHaveLength(12);
  });

  test('renders photos correctly', () => {
    (useQuery as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      data: mockFeedData,
      isLoading: false,
      error: null,
    });

    render(<Feed />, {
      wrapper: ProviderWrapper,
    });
    expect(screen.getByTestId('photo-box-1-wrapper')).toBeTruthy();
    expect(screen.getByTestId('photo-box-1-img')).toBeTruthy();
    expect(screen.getByTestId('photo-box-1-img')).toHaveProperty(
      'src',
      'http://test.1',
    );
    expect(screen.getByTestId('photo-box-1-author-name')).toHaveTextContent(
      'Test User 1',
    );
    expect(screen.getByTestId('photo-box-1-author-username')).toHaveTextContent(
      'testuser1',
    );

    expect(screen.getByTestId('photo-box-2-wrapper')).toBeTruthy();
    expect(screen.getByTestId('photo-box-2-img')).toBeTruthy();
    expect(screen.getByTestId('photo-box-2-img')).toHaveProperty(
      'src',
      'http://test.2',
    );
    expect(screen.getByTestId('photo-box-2-author-name')).toHaveTextContent(
      'Test User 2',
    );
    expect(screen.getByTestId('photo-box-2-author-username')).toHaveTextContent(
      'testuser2',
    );

    expect(screen.getByTestId('photo-box-3-wrapper')).toBeTruthy();
    expect(screen.getByTestId('photo-box-3-img')).toBeTruthy();
    expect(screen.getByTestId('photo-box-3-img')).toHaveProperty(
      'src',
      'http://test.3',
    );
    expect(screen.getByTestId('photo-box-3-author-name')).toHaveTextContent(
      'Test User 3',
    );
    expect(screen.getByTestId('photo-box-3-author-username')).toHaveTextContent(
      'testuser3',
    );
  });
});
