import 'reflect-metadata';
import { VueConstructor } from 'vue';
import { SinglePageApp } from '@/core/apps/SinglePageApp';
import { bootstrap } from '@/core';
import { modules } from './config';

bootstrap(SinglePageApp, modules).run();
