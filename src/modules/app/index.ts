import { services } from '@/core/di';
import { AppStateService } from './types';
export * from './types';

export const appStateService = () => services.getService<AppStateService>('appStateService');
