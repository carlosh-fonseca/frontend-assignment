import React from 'react';

export function Button({ children, ...props }: { children: React.ReactNode }) {
  return React.createElement('button', Object.assign({}, props), children);
}
