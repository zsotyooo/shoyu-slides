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

export type SlideshowTheme = 'light' | 'dark';

export interface SlideshowThemeDetials {
    theme: SlideshowTheme;
    name: string;
    description: string;
    // slideEditorComponent: VueConstructor;
}

export interface Slide {
    name: string;
    order: number;
    [index: string]: any;
}

export interface MdSlide extends Slide {
    content: string;
}

export interface Slideshow {
    id?: string;
    imageUrl: string;
    isPublished: boolean;
    theme: SlideshowTheme;
    title: string;
    type: SlideshowType;
    uid: string;
    slides: Slide[];
    createdAt: firebase.firestore.FieldValue | null;
    updatedAt: firebase.firestore.FieldValue | null;
}

export interface SlideshowDocument extends Document {
    data: Slideshow;
}

export interface SlideshowState {
    slideshows: Slideshow[] | null;
    currentSlideshow: Slideshow | null;
}

export interface SlideshowService {
    fetchSlideshows: (uid: string) => Promise<false | SlideshowDocument[]>;
    addSlideshow: (slideshow: Slideshow) => Promise<SlideshowDocument>;
    saveSlideshow: (slideshow: SlideshowDocument) => Promise<SlideshowDocument>;
    fetchSlideshow: (id: string) => Promise<SlideshowDocument | false>;
}
