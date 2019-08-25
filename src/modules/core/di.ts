import 'reflect-metadata';
import { Container } from 'inversify';
import { Application, Module } from './types';

class DiService {
    private installedModules: string[] = [];
    private setups: Array<(app: Application) => void> = [];

    constructor(
        private container: Container,
    ) {}

    public addService<T>(name: string, constructor: new (...args: any[]) => T) {
        this.container.bind<T>(name).to(constructor);
    }

    public getService<T>(name: string): T {
        return this.container.get<T>(name);
    }

    public getContainer(): Container {
        return this.container;
    }

    public registerModule(mod: Module) {
        if (this.installedModules.indexOf(mod.name) >= 0) {
            throw new Error(`Module with name "${mod.name}" is already registered`);
        }
        if (mod.dependencies &&
            !mod.dependencies.reduce((a, d) => a && this.installedModules.indexOf(d) >= 0, true as boolean)) {
            throw new Error(`${mod.name} has a missing dependency`);
        }
        this.installedModules.push(mod.name);
        if (mod.setup) {
            this.setups.push(mod.setup);
        }
    }

    public getModuleSetups() {
        return this.setups;
    }
}

export const di = new DiService(new Container());
