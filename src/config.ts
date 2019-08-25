
import firebase from 'firebase/app';
import { di } from '@/modules/core/di';
import { Application } from '@/modules/core';
import { SinglePageApp } from '@/modules/core/apps/SinglePageApp';
import { UserService } from '@/modules/user';
import { FirebaseUserService } from '@/modules/user/services/FirebaseUserService';
import { AuthService } from '@/modules/auth';
import { FirebaseAuthService } from '@/modules/auth/services/FirebaseAuthService';
import app from '@/modules/app/module';
import admin from '@/modules/admin/module';
import auth from '@/modules/auth/module';
import pwa from '@/modules/pwa/module';
import vuetify from '@/modules/vuetify/module';
import router from '@/modules/router/module';
import store from '@/modules/store/module';
import firebaseModule from '@/modules/firebase/module';
import helloworld from '@/modules/helloworld/module';
import user from '@/modules/user/module';
import bodymovin from '@/modules/bodymovin/module';

// Configure dependencies:
di.addService<UserService>('userService', FirebaseUserService);
di.addService<AuthService<firebase.auth.AuthProvider>>('authService', FirebaseAuthService);
di.addService<Application>('app', SinglePageApp);

// Register modules:
di.registerModule(pwa());
di.registerModule(bodymovin());
di.registerModule(vuetify());
di.registerModule(app());
di.registerModule(router());
di.registerModule(store());
di.registerModule(firebaseModule());
di.registerModule(admin());
di.registerModule(auth());
di.registerModule(user());
di.registerModule(helloworld());
