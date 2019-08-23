import { injectable } from 'inversify';
import Vue, { VueConstructor } from 'vue';
import VueRouter from 'vue-router';
import { Store } from 'vuex';
import { Application, Setup } from '@/modules/core';
import { RootState } from '@/modules/store';
import AppComponent from './App.vue';

@injectable()
export class SinglePageApp implements Application {
    private executed = false;
    private router: VueRouter;
    private store: Store<RootState>;

    private features: {
        [index: string]: any,
    } = {};

    public addFeature(key: string, feature: any) {
        if (feature instanceof VueRouter || feature instanceof Store) {
            throw new TypeError('You cannot add store or router as feature, use setStore, or setRouter instead!');
        }
        this.features[key] = feature;
    }

    public getFeature(key: string) {
        return this.features[key];
    }

    public setStore(store: Store<RootState>) {
        this.store = store;
    }

    public getStore(): Store<RootState> {
        if (!this.store) {
            throw new TypeError('No store specified!');
        }
        return this.store;
    }

    public setRouter(router: VueRouter) {
        this.router = router;
    }

    public getRouter(): VueRouter {
        if (!this.router) {
            throw new TypeError('No store specified!');
        }
        return this.router;
    }

    public mount(component: VueConstructor, place: string | Element | undefined) {
        const features = this.features;
        if (this.router) {
            features.router = this.router;
        }
        if (this.store) {
            features.store = this.store;
        }
        new Vue({
            ...features,
            render: (h) => h(component),
        }).$mount(place);
    }

    public async run(setups: Array<(app: Application) => void>) {
        if (!this.executed) {
            setups.map(async (setup) => {
                await setup(this);
            });

            this.mount(AppComponent as VueConstructor, '#app');

            this.executed = true;
        }
    }
}
