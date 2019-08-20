import { VuetifyPreset } from 'vuetify/types/presets';
import './light.scss';

const dark: VuetifyPreset = {
  theme: {
    dark: false,
    themes: {
      light: {
        primary: '#3aa859',
      },
    },
  },
  icons: {
    iconfont: 'mdi',
  },
};

export default dark;
