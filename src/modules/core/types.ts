import { VueConstructor } from 'vue';
import VueRouter from 'vue-router';
import { Store } from 'vuex';
import { RootState } from '../store';

export type SetupFn = (app: Application) => void;

export interface Application {
    mount: (component: VueConstructor, place: string | Element | undefined) => void;
    run: (setups: Array<(app: Application) => void>) => void;
    setStore: (store: Store<RootState>) => void;
    getStore: () => Store<RootState>;
    setRouter: (router: VueRouter) => void;
    getRouter: () => VueRouter;
    addFeature: (key: string, feature: any) => void;
    getFeature: (key: string) => any;
}

export interface Module {
    name: string;
    dependencies?: string[];
    setup?: SetupFn;
}
