import * as React from 'react';

// @ts-ignore
import styles from './styles.module.css';
import classnames from 'classnames';
import { useSlide } from './useSlide';
import { STEP } from './constants';

export interface SliderProps {
  className?: string;
  defaultValue?: number;
  max?: number;
  min?: number;
  style?: React.CSSProperties;
  onChange?: (value: number, oldValue: number) => void;
  showValues?: boolean;
}

/**
 * @name Slider
 * @param props
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
  const { onDrag, onDragEnd, onDragStart } = useSlide(config, onDragUpdate, onChange);

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
          draggable={true}
          onDrag={onDrag}
          onDragEnd={onDragEnd}
          onDragStart={onDragStart}
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
