import { di } from '@/modules/core/di';
import { AuthService } from '..';

let authServiceInstance: AuthService<any>;

export const authService = () => {
    if (!authServiceInstance) {
        authServiceInstance = di.getService<AuthService<any>>('authService');
    }
    return authServiceInstance;
};
