import { injectable, inject } from 'inversify';
import { db } from '@/modules/firebase';
import { SlideshowDocument, SlideshowService } from '..';

@injectable()
export class FirebaseSlideshowService implements SlideshowService {
    public async fetchSlideshows(uid: string) {
        return db().getCollection<SlideshowDocument>('slideshows', {
            fieldPath: 'uid',
            opStr: '==',
            value: uid,
        });
    }

    public async saveSlideshow(slideshow: SlideshowDocument) {
        return db().setDocument<SlideshowDocument>('slideshows', slideshow);
    }
}
