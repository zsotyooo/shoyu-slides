import { services } from '@/core/di';
import { AuthService } from './types';

export * from './types';

export const authService = () => services.getService<AuthService<any>>('authService');
