import { di } from '@/modules/core/di';
import { UserService } from './types';

let userServiceInstance: UserService;

export const userService = () => {
    if (!userServiceInstance) {
        userServiceInstance = di.getService<UserService>('userService');
    }
    return userServiceInstance;
};

export * from './types';
