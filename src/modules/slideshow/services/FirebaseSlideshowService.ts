import { injectable, inject } from 'inversify';
import { db } from '@/modules/firebase';
import { SlideshowDocument, SlideshowService, Slideshow } from '..';

@injectable()
export class FirebaseSlideshowService implements SlideshowService {
    public async fetchSlideshows(uid: string) {
        return db().getCollection<SlideshowDocument>('slideshows', {
            fieldPath: 'uid',
            opStr: '==',
            value: uid,
        });
    }

    public async fetchSlideshow(id: string) {
        return db().getDocument<SlideshowDocument>('slideshows', id);
    }

    public async addSlideshow(slideshow: Slideshow) {
        return db().addDocument<SlideshowDocument, Slideshow>('slideshows', slideshow);
    }

    public async saveSlideshow(slideshow: SlideshowDocument) {
        return db().setDocument<SlideshowDocument>('slideshows', slideshow);
    }
}
