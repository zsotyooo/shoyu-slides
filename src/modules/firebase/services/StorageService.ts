import firebase from 'firebase/app';
import { FirebaseAuthService } from '@/modules/auth/services/FirebaseAuthService';

export class StorageService {
    constructor(
        private storage: firebase.storage.Storage,
    ) {}

    public async uploadFile(
        folder: string,
        file: File,
        onRunning?: (s: firebase.storage.UploadTaskSnapshot) => void,
        onProgress?: (progress: number) => void,
        onPaused?: (s: firebase.storage.UploadTaskSnapshot) => void,
    ): Promise<string> {
        return new Promise((resolve, reject) => {
            const task = this.storage
            .ref(`${folder}/${file.name}`)
            .put(file, {
                contentType: file.type,
            });
            task.on(
                firebase.storage.TaskEvent.STATE_CHANGED,
                (snapshot) => {
                    if (onProgress) {
                        onProgress(snapshot.bytesTransferred / snapshot.totalBytes);
                    }
                    switch (snapshot.state) {
                        case firebase.storage.TaskState.PAUSED: // or 'paused'
                            if (onPaused) {
                                onPaused(snapshot);
                            }
                            break;
                        case firebase.storage.TaskState.RUNNING: // or 'running'
                            if (onRunning) {
                                onRunning(snapshot);
                            }
                            break;
                    }
                },
                (error) => reject(error),
                () => {
                    task.snapshot.ref.getDownloadURL().then((downloadURL) => {
                        resolve(downloadURL);
                    });
                },
            );
        });
    }

    public async listFiles(folder: string): Promise<firebase.storage.ListResult> {
        return this.storage
                .ref(folder)
                .listAll();
    }
}
