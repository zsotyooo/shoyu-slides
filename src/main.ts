import 'reflect-metadata';
import { SinglePageApp, bootstrap } from '@/core/app';
import { modules } from './config';

bootstrap(SinglePageApp, modules).run();
