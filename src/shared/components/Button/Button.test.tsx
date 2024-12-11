import { test, expect } from 'vitest';

import { Button } from './Button';
import { render } from '@testing-library/react';

test('mount component', async () => {
  const { getByRole } = render(<Button>Test</Button>);
  expect(getByRole('button').innerHTML).toBe('Test');
});
