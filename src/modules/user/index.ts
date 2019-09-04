import { services } from '@/core';
import { UserService } from './types';

export * from './types';

export const userService = () => services.getService<UserService>('userService');
