import * as React from 'react';

import styles from './styles.module.css';
import classnames from 'classnames';
import { useSlide } from './useSlide';

export interface Props {
  className?: string;
  defaultValue?: number;
  max?: number;
  min?: number;
  style: React.CSSProperties;
  onChange?: (value: number, oldValue: number) => void;
  showValues?: boolean;
}

/**
 * @name Slider
 * @param props
 */
const Slider: React.FC<Props> = (props) => {
  const {
    className,
    defaultValue = 0,
    max = 100,
    min = 0,
    onChange,
    showValues = false,
    style
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
      <div className={styles.slider} ref={draggingArea}>
        <div className={classesBackground} />
        <div className={classesForeground} style={{ width: percentage }} />
        <div
          className={styles.handle}
          draggable={true}
          onDrag={onDrag}
          onDragEnd={onDragEnd}
          onDragStart={onDragStart}
          style={{ left: handleLeft }}
        />
      </div>
      {showValues && <div>{max}</div>}
      {showValues && <div>Value: {value.toFixed(1)}</div>}
    </div>
  );
};

export { Slider };
