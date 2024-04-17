import { Slider } from './index.tsx';

export default {
  title: 'Components/Slider',
  component: Slider,
  tags: ['components'],
  parameters: {
    layout: 'centered'
  },
  args: {
    defaultValue: 45,
    max: 100,
    min: 10,
    style: { width: '300px' }
  }
};

export const NoValues = {
  args: {
    defaultValue: 45,
    max: 100,
    min: 10,
    style: { width: '300px' }
  }
};

export const WithValues = {
  args: {
    defaultValue: 45,
    max: 100,
    min: 10,
    style: { width: '300px' },
    showValues: true
  }
};
