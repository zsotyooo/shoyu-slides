import { services } from '@/core';
import { AuthService } from './types';

export * from './types';

export const authService = () => services.getService<AuthService<any>>('authService');
