import setupApp from '@/modules/app/setup';
import setupFirebase from '@/modules/firebase/setup';
import setupRouter from '@/modules/router/setup';
import setupStore from '@/modules/store/setup';
import setupVuetify from '@/modules/vuetify/setup';
import setupPwa from '@/modules/pwa/setup';
import setupAuth from '@/modules/auth/setup';
import setupUser from '@/modules/user/setup';
import setupHelloword from '@/modules/helloworld/setup';

const vuetify = setupVuetify();
const router = setupRouter();
const store = setupStore();

setupFirebase();
setupPwa();
setupHelloword(router);
setupUser(store);
setupAuth(router, store, () => {
    setupApp(
        router,
        store,
        vuetify,
    ).$mount('#app');
});
