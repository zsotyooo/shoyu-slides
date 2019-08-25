import { di } from '@/modules/core/di';
import { AuthService } from './types';

export * from './types';

let authServiceInstance: AuthService<any>;

export const authService = () => {
    if (!authServiceInstance) {
        authServiceInstance = di.getService<AuthService<any>>('authService');
    }
    return authServiceInstance;
};

