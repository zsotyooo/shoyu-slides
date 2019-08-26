import { di } from '@/modules/core/di';
import { SlideshowService } from './types';

export * from './types';

let slideshowServiceInstance: SlideshowService;

export const slideshowService = () => {
    if (!slideshowServiceInstance) {
        slideshowServiceInstance = di.getService<SlideshowService>('slideshowService');
    }
    return slideshowServiceInstance;
};
