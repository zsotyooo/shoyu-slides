import firebase from 'firebase/app';
import { services } from '@/core';
import { MediaService } from './types';

export * from './types';

export const mediaService = () => services.getService<MediaService>('mediaService');
