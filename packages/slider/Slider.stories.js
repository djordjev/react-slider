import { Slider } from './index';
import { fn } from '@storybook/test';

export default {
  title: 'Components/Slider',
  component: Slider,
  tags: ['components'],
  parameters: {
    layout: 'fullscreen',
  },
  args: {
    onLogin: fn(),
    onLogout: fn(),
    onCreateAccount: fn(),
  },
};

export const Continuous = {
  args: {
    user: {
      name: 'Jane Doe',
    },
  },
};

export const NotContinuous = {};