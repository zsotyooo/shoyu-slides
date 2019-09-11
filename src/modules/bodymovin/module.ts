import Vue from 'vue';
import { Application } from '@/core/app';

// TODO: add back when this is merged: https://github.com/ionic-team/pwa-elements/pull/32
// import 'bodymovin-web-components';

export default () => ({
    name: 'bodymovin',
    setup: (app: Application) => {
        Vue.config.ignoredElements.push(/lottie-(.*)/);
    },
});
