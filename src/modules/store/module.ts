import Vue from 'vue';
import Vuex, { Store, StoreOptions } from 'vuex';
import { version } from '../../../package.json';
import { RootState } from '@/modules/store';
import { Application } from '@/modules/core';

export default () => ({
    name: 'store',
    setup: (app: Application) => {
        Vue.use(Vuex);

        const store: StoreOptions<RootState> = {
            state: {
                version,
            },
        };

        app.setStore(new Store<RootState>(store));

        return Promise.resolve();
    },
});
