import '@testing-library/jest-dom';

import * as React from 'react';
import { describe, expect, it, vi, beforeEach } from 'vitest';
import { Slider, SliderProps } from '../index';
import { fireEvent, render, screen } from '@testing-library/react';

describe('Slider', () => {
  let props: SliderProps;

  const createComponent = () => <Slider {...props} />;

  beforeEach(() => {
    props = {
      defaultValue: 50,
      max: 100,
      min: 0,
      onChange: vi.fn(),
      style: { width: 200 },
      showValues: true
    };
  });

  it('displays values', () => {
    render(createComponent());

    expect(screen.getByText(props.min!)).toBeInTheDocument();
    expect(screen.getByText(props.max!)).toBeInTheDocument();
    expect(screen.getByText('Value: 50.0')).toBeInTheDocument();
    expect(screen.getByRole('slider')).toBeInTheDocument();
  });

  it('changes value', () => {
    render(createComponent());

    const handle = screen.getByRole('slider').lastChild as HTMLDivElement;

    handle.focus();

    fireEvent.keyDown(handle, { key: 'ArrowRight', keyCode: 39, code: 39, charCode: 39 });

    expect(screen.getByText('Value: 60.0')).toBeInTheDocument();

    expect(props.onChange).toHaveBeenCalledOnce();
    expect(props.onChange).toHaveBeenCalledWith(60, 50);
  });
});
