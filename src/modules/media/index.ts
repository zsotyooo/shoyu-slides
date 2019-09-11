import { services } from '@/core/di';
import { MediaService } from './types';

export * from './types';

export const mediaService = () => services.getService<MediaService>('mediaService');
