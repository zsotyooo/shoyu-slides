import Vue from 'vue';
import VueRouter from 'vue-router';
import { Store } from 'vuex';
import { RootState } from '../store';
import { Vuetify } from 'vuetify';
import LayoutEmpty from './layout/LayoutEmpty.vue';
import FormCard from './components/FormCard.vue';
import App from './App.vue';

let theApp: Vue;

export default (
    router: VueRouter,
    store: Store<RootState>,
    vuetify: Vuetify,
): Vue => {
    if (!theApp) {
        Vue.component('layout-empty', LayoutEmpty);
        Vue.component('form-card', FormCard);

        theApp = new Vue({
            router,
            store,
            vuetify,
            render: (h) => h(App),
        });
    }
    return theApp;
};
