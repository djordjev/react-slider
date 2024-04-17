import * as React from 'react';

import styles from './styles.module.css';
import classnames from 'classnames';

export interface Props {
  className?: string;
  defaultValue?: number;
  max?: number;
  min?: number;
  style: React.CSSProperties;
}

/**
 * @name Slider
 * @param props
 */
const Slider: React.FC<Props> = (props) => {
  const { className, defaultValue = 0, max = 100, min = 0, style } = props;

  // Hooks
  const [value, setValue] = React.useState(defaultValue || min);

  // Setup
  const progress = (value - min) / (max - min);
  const percentage = `${progress * 100}%`;
  const handleLeft = `calc(${percentage} - 12px)`;

  // Styles
  const classes = classnames(styles.component, className);
  const classesBackground = classnames(styles.bar, styles.background);
  const classesForeground = classnames(styles.bar, styles.foreground);

  // Handlers
  const updateValue = React.useCallback(() => {
    if (defaultValue < min || defaultValue > max) {
      console.warn(`Default value set to ${defaultValue} but it must be between ${min} and ${max}`);
      return;
    }

    setValue(defaultValue);
  }, [defaultValue, min, max]);

  // Life-cycle
  React.useEffect(updateValue, [defaultValue]);

  return (
    <div className={classes} style={style}>
      <div>
        <div className={classesBackground} />
        <div className={classesForeground} style={{ width: percentage }} />
        <div className={styles.handle} style={{ left: handleLeft }} />
      </div>
    </div>
  );
};

export { Slider };
