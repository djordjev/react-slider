import * as React from 'react';

// @ts-ignore
import styles from './styles.module.css';
import classnames from 'classnames';
import { useSlide } from './useSlide';
import { STEP } from './constants';

export interface SliderProps {
  /**
   * @description Optional class name that will be applied to top element.
   */
  className?: string;

  /**
   * @description Default value that will be set when component is mounted. This value must be between
   * min and max values. It's possible to programatically control the slider using this prop.
   */
  defaultValue?: number;

  /**
   * @description Maximum value that slider can have. @default value is 100.
   */
  max?: number;

  /**
   * @description Minimum value that slider can have. @default value is 0.
   */
  min?: number;

  /**
   * @description Optional styles that can be passed as object from parent component.
   */
  style?: React.CSSProperties;

  /**
   * @description `onChange` callback will be called every time when user changes slider value.
   * That can be either by stop dragging (not fired while dragging handle) or after key press.
   * @param value New value of the slider
   * @param oldValue Old value of the slider (before dragging started)
   * @returns void;
   */
  onChange?: (value: number, oldValue: number) => void;

  /**
   * @description Flag indicating whether to show values or not. If set to true it will display min,
   * max and current value. If set to false it will only display slider.
   */
  showValues?: boolean;
}

/**
 * @name Slider
 * @description This is an implementation of slider. User can either drag the handle or use arrow keys
 * to move slider. There are two modes what the component will display. If `showValues` is set to true
 * it will display min and max values and current value. If `showValues` is set to false it will only
 * show slider without any additional information.
 */
const Slider: React.FC<SliderProps> = (props) => {
  const {
    className,
    defaultValue = 0,
    max = 100,
    min = 0,
    onChange,
    showValues = false,
    style = {}
  } = props;

  // Hooks
  const [value, setValue] = React.useState(defaultValue || min);
  const draggingArea = React.useRef<HTMLDivElement>(null);

  // Setup
  const progress = (value - min) / (max - min);
  const percentage = `${progress * 100}%`;
  const handleLeft = `calc(${percentage} - 12px)`;
  const config = { draggingArea, max, min, value };

  // Styles
  const classes = classnames(styles.component, className);
  const classesBackground = classnames(styles.bar, styles.background);
  const classesForeground = classnames(styles.bar, styles.foreground);

  // Handlers
  const onDragUpdate = (value: number) => {
    setValue(value);
  };

  const onKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    const isLeft = event.key === 'ArrowLeft';
    const isRight = event.key === 'ArrowRight';

    if (!isLeft && !isRight) return;

    const offset = (max - min) * STEP;
    let newValue: number = 0;

    if (event.key === 'ArrowLeft') {
      newValue = Math.max(min, value - offset);
    }

    if (event.key === 'ArrowRight') {
      newValue = Math.min(max, value + offset);
    }

    onChange?.(newValue, value);
    setValue(newValue);
  };

  const updateValue = React.useCallback(() => {
    if (defaultValue < min || defaultValue > max) {
      console.warn(`Default value set to ${defaultValue} but it must be between ${min} and ${max}`);
      return;
    }

    setValue(defaultValue);
  }, [defaultValue, min, max]);

  // Life-cycle
  React.useEffect(updateValue, [defaultValue]);
  const { onDragStart } = useSlide(config, onDragUpdate, onChange);

  return (
    <div className={classes} style={style}>
      {showValues && <div>{min}</div>}
      <div
        aria-valuemax={max}
        aria-valuemin={min}
        aria-valuenow={value}
        className={styles.slider}
        ref={draggingArea}
        role="slider"
      >
        <div className={classesBackground} />
        <div className={classesForeground} style={{ width: percentage }} />
        <div
          className={styles.handle}
          onMouseDown={onDragStart}
          onKeyDown={onKeyDown}
          style={{ left: handleLeft }}
          tabIndex={0}
        />
      </div>
      {showValues && <div>{max}</div>}
      {showValues && <div className={styles.value}>Value: {value.toFixed(1)}</div>}
    </div>
  );
};

export { Slider };
