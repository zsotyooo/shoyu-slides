import { VuetifyPreset } from 'vuetify/types/presets';
import './dark.scss';

const dark: VuetifyPreset = {
    theme: {
        dark: true,
        themes: {
            dark: {
                primary: '#FFA267',
                secondary: '#856C0D',
                accent: '#C314BE',
                error: '#ff5722',
                warning: '#ff9800',
                info: '#00bcd4',
                success: '#4caf50',
            },
        },
    },
    icons: {
        iconfont: 'mdi',
    },
};

export default dark;
