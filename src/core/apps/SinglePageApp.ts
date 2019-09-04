import { injectable } from 'inversify';
import Vue from 'vue';
import VueRouter from 'vue-router';
import { Store } from 'vuex';
import { Application, RootState, services } from '..';
import { authService } from '@/modules/auth';
import AppComponent from '@/core/App.vue';

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

    public mount(component: {}, place: string | Element | undefined) {
        const features = this.features;
        if (this.router) {
            features.router = this.router;
            this.router.addRoutes([
                {
                    path: '*',
                    component: () => import(/* webpackChunkName: "error" */ '@/modules/app/views/Error404.vue'),
                },
            ]);
        }
        if (this.store) {
            features.store = this.store;
        }
        new Vue({
            ...features,
            render: (h) => h(component),
        }).$mount(place);
    }

    public async run() {
        if (!this.executed) {
            services.getModuleSetups().map(async (setup) => {
                await setup(this);
            });

            authService().onAuthStateChanged(() => this.mount(AppComponent, '#app'));

            this.executed = true;
        }
        console.info('The app is running');
    }
}
