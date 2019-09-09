import { VuetifyPreset } from 'vuetify/types/presets';
import './dark.scss';
import './text-field-custom.scss';

const dark: VuetifyPreset = {
    theme: {
        dark: false,
        themes: {
            light: {
                primary: '#00B89F',
                secondary: '#1796EB',
                accent: '#C314BE',
                error: '#ff5722',
                warning: '#ff9800',
                info: '#00bcd4',
                success: '#4caf50',
            },
            dark: {
                primary: '#00B89F',
                secondary: '#1796EB',
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
