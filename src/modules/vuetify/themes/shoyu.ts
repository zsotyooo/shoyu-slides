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
                dark: '#213E52',
                error: '#EB1917',
                warning: '#FFB84D',
                info: '#0AB3CF',
                success: '#0AC442',
            },
            dark: {
                primary: '#00B89F',
                secondary: '#1796EB',
                accent: '#C314BE',
                dark: '#213E52',
                error: '#EB1917',
                warning: '#FFB84D',
                info: '#0AB3CF',
                success: '#0AC442',
            },
        },
    },
    icons: {
        iconfont: 'mdi',
    },
};

export default dark;
