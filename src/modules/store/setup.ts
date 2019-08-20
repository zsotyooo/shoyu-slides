import Vue from 'vue';
import { version } from '../../../package.json';
import Vuex, { Store, StoreOptions } from 'vuex';
import { RootState } from './types';

Vue.use(Vuex);

const store: StoreOptions<RootState> = {
  state: {
    version,
  },
};

export default () => new Store<RootState>(store);
