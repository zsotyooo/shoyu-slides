import Vue from 'vue';
import Vuetify from 'vuetify';
import dark from './themes/dark';
import WebFontLoader from 'webfontloader';

export default () => {
    WebFontLoader.load({
        google: {
            families: [
                'Roboto:100,300,400,500,700,900',
                'Roboto+Mono:500',
                'Material+Icons',
            ],
        },
    });

    Vue.use(Vuetify);

    return new Vuetify(dark);
};
