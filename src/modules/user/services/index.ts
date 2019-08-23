import { di } from '@/modules/core/di';
import { UserService } from '..';

let userServiceInstance: UserService;

export const userService = () => {
    if (!userServiceInstance) {
        userServiceInstance = di.getService<UserService>('userService');
    }
    return userServiceInstance;
};
