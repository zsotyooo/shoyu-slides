
import { BootstrapConfig } from '@/core/app';
import { FirebaseUserService } from '@/modules/user/services/FirebaseUserService';
import { FirebaseAuthService } from '@/modules/auth/services/FirebaseAuthService';
import { FirebaseSlideshowService } from '@/modules/slideshow/services/FirebaseSlideshowService';
import { FirebaseMediaService } from '@/modules/media/services/FirebaseMediaService';
import { AdminAppStateService } from '@/modules/admin/services/AdminAppStateService';
import core from '@/core/app/module';
import pwa from '@/modules/pwa/module';
import bodymovin from '@/modules/bodymovin/module';
import vuetify from '@/modules/vuetify/module';
import app from '@/modules/app/module';
import firebaseModule from '@/modules/firebase/module';
import admin from '@/modules/admin/module';
import auth from '@/modules/auth/module';
import user from '@/modules/user/module';
import pages from '@/modules/pages/module';

import slideshow from '@/modules/slideshow/module';
import media from '@/modules/media/module';


export const modules: BootstrapConfig[] = [
    {
        module: core(),
    },
    {
        module: pwa(),
    },
    {
        module: bodymovin(),
    },
    {
        module: vuetify(),
    },
    {
        module: app(),
    },
    {
        module: firebaseModule(),
    },
    {
        module: admin(),
        services: [
            { id: 'appStateService', service: AdminAppStateService },
        ],
    },
    {
        module: auth(),
        services: [
            { id: 'authService', service: FirebaseAuthService },
        ],
    },
    {
        module: user(),
        services: [
            { id: 'userService', service: FirebaseUserService },
        ],
    },
    {
        module: slideshow(),
        services: [
            { id: 'slideshowService', service: FirebaseSlideshowService },
        ],
    },
    {
        module: media(),
        services: [
            { id: 'mediaService', service: FirebaseMediaService },
        ],
    },
    {
        module: pages(),
    },
];
