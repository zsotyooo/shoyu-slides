export * from './types';
import { services } from '@/core';
import { AppStateService } from './types';

// console.log(services);
export const appStateService = () => services.getService<AppStateService>('appStateService');
