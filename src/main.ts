import 'reflect-metadata';

import './config';
import { di } from '@/modules/core/di';
import { Application } from '@/modules/core';

const theApp = di.getService<Application>('app');
theApp.run(di.getModuleSetups());
