import { Document } from '@/modules/firebase';

export type SlideshowType = 'md';

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
}

export interface SlideshowDocument extends Document {
    data: Slideshow;
}

export interface SlideshowState {
    status: 'loading' | 'success' | 'failed';
    slideshows: Slideshow[] | null;
    currentSlideshow: Slideshow | null;
}

export interface SlideshowService {
    fetchSlideshows: (uid: string) => Promise<false | SlideshowDocument[]>;
    saveSlideshow: (slideshow: SlideshowDocument) => Promise<SlideshowDocument>;
}
