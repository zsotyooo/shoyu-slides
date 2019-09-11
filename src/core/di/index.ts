import { Container } from 'inversify';
import { DiService } from './services/DiService';

export const services = new DiService(new Container({ defaultScope: 'Singleton' }));
