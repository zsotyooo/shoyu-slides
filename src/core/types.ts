import { VueConstructor } from 'vue';
import VueRouter from 'vue-router';
import { Store } from 'vuex';

export type SetupFn = (app: Application) => void;

export interface Application {
    mount: (component: VueConstructor, place: string | Element | undefined) => void;
    run: () => void;
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

export interface BootstrapConfig {
    module: Module;
    services?: Array<{
        id: string;
        service: new (...args: any[]) => any;
    }>;
}

export interface RootState {
    version: string;
}
