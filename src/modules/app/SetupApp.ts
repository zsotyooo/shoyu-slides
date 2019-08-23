import Vue from 'vue';
import { Setup, Application } from '@/modules/core';
import LayoutEmpty from './layout/LayoutEmpty.vue';
import FormCard from './components/FormCard.vue';

export class SetupApp implements Setup {
    private setupDone = false;

    public async setup(app: Application) {
        if (!this.setupDone) {
            Vue.component('layout-empty', LayoutEmpty);
            Vue.component('form-card', FormCard);
            this.setupDone = true;
        }
        return Promise.resolve();
    }
}
