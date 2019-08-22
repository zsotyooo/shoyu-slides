// import VueRouter from 'vue-router';
import { Store } from 'vuex';
import { onAuthStateChanged } from '@/modules/auth/services/firebase';
import { RootState } from '../store';
import { storeConfig } from './store';

export default (store: Store<RootState>) => {
    store.registerModule('user', storeConfig);
    onAuthStateChanged((user) => {
        store.dispatch('user/setCurrentUser', user);
    });
};
