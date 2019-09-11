import { services } from '@/core/di';
import { Application, BootstrapConfig } from './types';

export * from './types';
export * from './apps/SinglePageApp';

export const bootstrap = (
    AppClass: new (...args: any[]) => Application,
    modules: BootstrapConfig[],
): Application => {
    services.addService<Application>('app', AppClass);

    modules.forEach((mod) => {
        if (mod.services) {
            mod.services.forEach((serv) => {
                services.addService(serv.id, serv.service);
            });
        }
        services.registerModule(mod.module);
    });

    return services.getService<Application>('app');
};
