import 'reflect-metadata';
import { VueConstructor } from 'vue';
import './config';
import { di } from '@/modules/core/di';
import { Application } from '@/modules/core';
import AppComponent from '@/modules/app/App.vue';


const theApp = di.getService<Application>('app');
theApp.run(AppComponent as VueConstructor, di.getModuleSetups());
