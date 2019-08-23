import Vue from 'vue';
import Vuetify from 'vuetify';
import dark from './themes/dark';
import WebFontLoader from 'webfontloader';
import { Setup, Application } from '@/modules/core';

export class SetupVuetify implements Setup {
    public setup(app: Application) {
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

        app.addFeature('vuetify', new Vuetify(dark));

        return Promise.resolve();
    }
}
