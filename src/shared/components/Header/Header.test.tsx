import { afterEach, beforeEach, describe, expect, test } from 'vitest';
import { cleanup, render } from '@testing-library/react';

import { MemoryRouter } from 'react-router-dom';
import { Header } from './Header';
import { ModalProvider } from '../../context/ModalContext';
import { ReactNode } from 'react';

const ProviderWrapper = ({ children }: { children: ReactNode }) => (
  <MemoryRouter initialEntries={['/']}>
    <ModalProvider>{children}</ModalProvider>
  </MemoryRouter>
);

describe('Header', () => {
  beforeEach(() => {});

  afterEach(() => {
    cleanup();
  });

  test('renders title correctly', () => {
    const { getByText } = render(<Header />, { wrapper: ProviderWrapper });
    expect(getByText('MyPhotoShoot')).toBeTruthy();
  });

  test('renders Feed button correctly', () => {
    const { getByTestId } = render(<Header />, { wrapper: ProviderWrapper });
    expect(getByTestId('feed-button')).toBeTruthy();
  });

  test('renders Add Photo button correctly', () => {
    const { getByTestId } = render(<Header />, { wrapper: ProviderWrapper });
    expect(getByTestId('add-photo-button')).toBeTruthy();
  });

  test('renders My Albums button correctly', () => {
    const { getByTestId } = render(<Header />, { wrapper: ProviderWrapper });
    expect(getByTestId('my-albums-button')).toBeTruthy();
  });
});
