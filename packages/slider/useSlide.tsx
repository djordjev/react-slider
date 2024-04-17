import * as React from 'react';
import { NO_IMAGE } from './constants';

type DragEvent = React.DragEvent<HTMLDivElement>;

type SlideConfig = {
  draggingArea: React.RefObject<HTMLDivElement>;
  max: number;
  min: number;
  value: number;
};

/**
 * @name useSlide
 * @description This hook encapsulates the logic for handling the slider drag events. It gets config
 * values (draggingArea, max, min, value) and callbacks (onUpdate, onEnd) and returns the handlers.
 * While user is dragging handle it fires `onUpdate` callback with the new value. When user stops
 * dragging it calls `onEnd` callback with the new and old values.
 */
const useSlide = (
  config: SlideConfig,
  onUpdate: (value: number) => void,
  onEnd?: (newValue: number, oldValue: number) => void
) => {
  const { draggingArea, max, min, value } = config;

  // Hooks
  const initialDragPosition = React.useRef<number | null>(null);
  const initialValue = React.useRef<number | null>(null);

  // Handlers
  const onDragStart = React.useCallback(
    (e: DragEvent) => {
      initialDragPosition.current = e.clientX;
      initialValue.current = value;
      e.dataTransfer.setDragImage(NO_IMAGE, 0, 0);
    },
    [value]
  );

  const onDragEnd = React.useCallback(() => {
    onEnd?.(value, initialValue.current ?? 0);

    initialDragPosition.current = null;
    initialValue.current = null;
  }, []);

  const onDrag = React.useCallback(
    (e: DragEvent) => {
      if (e.screenX === 0) return;

      if (initialDragPosition.current === null || !draggingArea.current || !initialValue.current) {
        return;
      }

      const offset = e.clientX - initialDragPosition.current;

      const { width } = draggingArea.current.getBoundingClientRect();
      const relativeMovement = (max - min) * (offset / width);

      const newValue = Math.min(max, Math.max(min, initialValue.current + relativeMovement));

      if (newValue != value) onUpdate(newValue);
    },
    [min, max, value]
  );

  return { onDrag, onDragEnd, onDragStart };
};

export { useSlide };
