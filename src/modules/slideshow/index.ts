import firebase from 'firebase/app';
import { services } from '@/core';
import { SlideshowService, SlideshowTypeDetials, SlideshowThemeDetials, Slideshow } from './types';

export * from './types';

export const slideshowService = () => services.getService<SlideshowService>('slideshowService');

export const slideshowTypes: SlideshowTypeDetials[] = [
    {
        type: 'md',
        name: 'Markdown slideshow',
        description: 'Simple slideshow with markdown editor',
    },
];

export const slideshowThemes: SlideshowThemeDetials[] = [
    {
        theme: 'beige',
        name: 'beige',
        bgColor: '#f7f3de',
        titleColor: '#333',
        color: '#333',
    },
    {
        theme: 'black',
        name: 'black',
        bgColor: '#191919',
        titleColor: '#fff',
        color: '#fff',
    },
    {
        theme: 'blood',
        name: 'blood',
        bgColor: '#222',
        titleColor: '#eee',
        color: '#eee',
    },
    {
        theme: 'league',
        name: 'league theme',
        bgColor: '#2b2b2b',
        titleColor: '#eee',
        color: '#eee',
    },
    {
        theme: 'moon',
        name: 'moon theme',
        bgColor: '#002b36',
        titleColor: '#eee8d5',
        color: '#93a1a1',
    },
    {
        theme: 'night',
        name: 'night theme',
        bgColor: '#111',
        titleColor: '#eee',
        color: '#eee',
    },
    {
        theme: 'serif',
        name: 'serif theme',
        bgColor: '#F0F1EB',
        titleColor: '#383D3D',
        color: '#000',
    },
    {
        theme: 'simple',
        name: 'simple theme',
        bgColor: '#fff',
        titleColor: '#000',
        color: '#000',
    },
    {
        theme: 'sky',
        name: 'sky theme',
        bgColor: '#f7fbfc',
        titleColor: '#333',
        color: '#333',
    },
    {
        theme: 'solarized',
        name: 'solarized theme',
        bgColor: '#fdf6e3',
        titleColor: '#586e75',
        color: '#657b83',
    },
    {
        theme: 'white',
        name: 'white theme',
        bgColor: '#fff',
        titleColor: '#222',
        color: '#222',
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
        theme: 'simple',
        uid: '',
        isPublished: false,
        slides: [],
        createdAt: now,
        ...data,
        updatedAt: now,
    };
};

export const revealAnimationsIn = [
    'slide-in',
    'fade-in',
    'convex-in',
    'concave-in',
    'zoom-in',
    'none',
];

export const revealAnimationsOut = [
    'slide-out',
    'fade-out',
    'convex-out',
    'concave-out',
    'zoom-out',
    'none',
];
