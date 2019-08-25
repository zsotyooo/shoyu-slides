import Vue from 'vue';
import { Application } from '@/modules/core';
import LayoutEmpty from './layout/LayoutEmpty.vue';
import LayoutLogo from './layout/LayoutLogo.vue';
import LayoutFull from './layout/LayoutFull.vue';
import FormCard from './components/FormCard.vue';

let setupDone = false;

export default () => ({
    name: 'admin',
    dependencies: ['vuetify'],
    setup: (app: Application) => {
        if (!setupDone) {
            Vue.component('admin-layout-logo', LayoutLogo);
            Vue.component('admin-layout-empty', LayoutEmpty);
            Vue.component('admin-layout-full', LayoutFull);
            Vue.component('form-card', FormCard);
            setupDone = true;
        }
        return Promise.resolve();
    },
});
