import { Document } from '@/modules/firebase';
import { VueConstructor } from 'vue';
import firebase from 'firebase/app';

export type SlideshowType = 'md';

export interface SlideshowTypeDetials {
    type: SlideshowType;
    name: string;
    description: string;
    // slideEditorComponent: VueConstructor;
}

export type SlideshowStatus = 'success' | 'failure' | 'loading';

export interface Slide {
    name: string;
    order: number;
    [index: string]: any;
}

export interface MdSlide extends Slide {
    content: string;
}

export interface Slideshow {
    imageUrl: string;
    isPublished: boolean;
    theme: string;
    title: string;
    type: SlideshowType;
    uid: string;
    slides: Slide[];
    createdAt: firebase.firestore.Timestamp | null;
    updatedAt: firebase.firestore.Timestamp | null;
}

export interface SlideshowDocument extends Document {
    data: Slideshow;
}

export interface SlideshowState {
    status: SlideshowStatus | null;
    slideshows: Slideshow[] | null;
    currentSlideshow: Slideshow | null;
}

export interface SlideshowService {
    fetchSlideshows: (uid: string) => Promise<false | SlideshowDocument[]>;
    saveSlideshow: (slideshow: SlideshowDocument) => Promise<SlideshowDocument>;
}
