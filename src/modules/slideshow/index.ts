import { di } from '@/modules/core/di';
import { SlideshowService, SlideshowTypeDetials } from './types';

export * from './types';

let slideshowServiceInstance: SlideshowService;

export const slideshowService = () => {
    if (!slideshowServiceInstance) {
        slideshowServiceInstance = di.getService<SlideshowService>('slideshowService');
    }
    return slideshowServiceInstance;
};

export const slideshowTypes: SlideshowTypeDetials[] = [
    {
        type: 'md',
        name: 'Markdown slideshow',
        description: 'Simple markdown slideshow with a singular markdown editor',
    },
];
