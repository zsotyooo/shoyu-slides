import { services } from '@/core/di';
import { UserService } from './types';

export * from './types';

export const userService = () => services.getService<UserService>('userService');
