import { injectable, inject } from 'inversify';
import { storage } from '@/modules/firebase';
import { MediaService } from '..';

@injectable()
export class FirebaseMediaService implements MediaService {
    public async uploadToUserFolder(
        uid: string,
        file: File,
        onStarted?: () => void,
        onProgress?: (progress: number) => void,
        onPaused?: () => void,
    ): Promise<string> {
        return storage().uploadFile(`/users/${uid}`, file, onStarted, onProgress, onPaused);
    }

    public async fetchUserFiles(uid: string): Promise<string[]> {
        const list = await storage().listFiles(`/users/${uid}`);
        const items: string[] = [];
        await list.items.forEach(async (item) => {
            const downloadUrl = await item.getDownloadURL();
            if (downloadUrl) {
                items.push(downloadUrl);
            }
        });
        return Promise.resolve(items);
    }
}
