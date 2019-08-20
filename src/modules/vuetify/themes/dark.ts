import { VuetifyPreset } from 'vuetify/types/presets';
import './dark.scss';

const dark: VuetifyPreset = {
  theme: {
    dark: true,
    themes: {
      dark: {
        primary: '#3aa859',
      },
    },
  },
  icons: {
    iconfont: 'mdi',
  },
};

export default dark;
