import { Container } from 'inversify';
import { DiService } from './services/DiService';

export const di = new DiService(new Container());
