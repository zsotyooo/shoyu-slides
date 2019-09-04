export * from './types';
import { Container } from 'inversify';
import { DiService } from './services/DiService';
import { Module, Application, BootstrapConfig } from './types';

export const services = new DiService(new Container({ defaultScope: 'Singleton' }));

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
