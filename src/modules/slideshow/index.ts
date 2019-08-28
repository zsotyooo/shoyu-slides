import firebase from 'firebase/app';
import { di } from '@/modules/core/di';
import { SlideshowService, SlideshowTypeDetials, SlideshowThemeDetials, Slideshow } from './types';

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

export const slideshowThemes: SlideshowThemeDetials[] = [
    {
        theme: 'light',
        name: 'Light theme',
        description: 'Light background with dark text.',
    },
    {
        theme: 'dark',
        name: 'Dark theme',
        description: 'Dark background with white text.',
    },
];

export const createSlideshowObject = (data: Partial<Slideshow>): Slideshow => {
    const now = firebase.firestore.FieldValue.serverTimestamp();
    if (!data.title || !data.theme || !data.type || !data.uid) {
        throw new TypeError(`Missing slideshow data ${JSON.stringify(data)}`);
    }

    return {
        title: 'Unknown slideshow',
        imageUrl: '',
        type: 'md',
        theme: 'light',
        uid: '',
        isPublished: false,
        slides: [],
        createdAt: now,
        ...data,
        updatedAt: now,
    };
};
