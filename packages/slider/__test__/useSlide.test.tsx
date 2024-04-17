import * as React from 'react';

import { test, vi, expect } from 'vitest';
import { useSlide } from '../useSlide';
import { render } from '@testing-library/react';

test('useSlide', () => {
  let hook: ReturnType<typeof useSlide>;

  const onUpdate = vi.fn();
  const onEnd = vi.fn();
  const getBoundingClientRect = vi.fn(() => ({ width: 300 }));
  const dataTransfer = { setDragImage: vi.fn() } as any;

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

  hook!.onDragStart({ clientX: 150, dataTransfer } as React.DragEvent<HTMLDivElement>);
  hook!.onDrag({ clientX: 300, dataTransfer } as React.DragEvent<HTMLDivElement>);
  hook!.onDragEnd();

  expect(onUpdate).toHaveBeenCalledOnce();
  expect(onUpdate).toHaveBeenCalledWith(100);

  expect(onEnd).toHaveBeenCalledOnce();
});
