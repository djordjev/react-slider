import * as React from 'react';

import { test, vi, expect } from 'vitest';
import { useSlide } from '../useSlide';
import { fireEvent, render } from '@testing-library/react';

test('useSlide', () => {
  let hook: ReturnType<typeof useSlide>;

  const onUpdate = vi.fn();
  const onEnd = vi.fn();
  const getBoundingClientRect = vi.fn(() => ({ width: 300 }));

  const TestHook = () => {
    hook = useSlide(
      {
        draggingArea: { current: { getBoundingClientRect } as any },
        max: 100,
        min: 0,
        value: 50
      },
      onUpdate,
      onEnd
    );

    return null;
  };

  render(<TestHook />);

  hook!.onDragStart({ clientX: 150 } as any);

  fireEvent.mouseMove(document.body, { clientX: 300 });
  fireEvent.mouseUp(document.body);

  expect(onUpdate).toHaveBeenCalledOnce();
  expect(onUpdate).toHaveBeenCalledWith(100);

  expect(onEnd).toHaveBeenCalledOnce();
});
