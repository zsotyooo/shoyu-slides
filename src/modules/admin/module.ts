import Vue from 'vue';
import { Application } from '@/modules/core';
import { storeConfig } from './store';
import LayoutEmpty from './layouts/LayoutEmpty.vue';
import LayoutLogo from './layouts/LayoutLogo.vue';
import LayoutFull from './layouts/LayoutFull.vue';
import FormCard from './components/FormCard.vue';
import HelperOffset from './components/HelperOffset.vue';
import Card from './components/Card.vue';

let setupDone = false;

export default () => ({
    name: 'admin',
    dependencies: ['vuetify'],
    setup: (app: Application) => {
        if (!setupDone) {
            app.getStore().registerModule('admin', storeConfig);
            Vue.component('admin-layout-logo', LayoutLogo);
            Vue.component('admin-layout-empty', LayoutEmpty);
            Vue.component('admin-layout-full', LayoutFull);
            Vue.component('admin-helper-offset', HelperOffset);
            Vue.component('admin-card', Card);
            Vue.component('form-card', FormCard);
            setupDone = true;
        }
        return Promise.resolve();
    },
});
