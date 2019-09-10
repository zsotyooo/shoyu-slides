export interface MediaState {
    list: string[] | null;
    currentUploads: string[] | null;
}

export interface FileUpload {
    id: number;
    file: File;
    progress: number;
    done: boolean;
    localImageData?: string;
}

export interface MediaService {
    uploadToUserFolder(
        uid: string,
        file: File,
        onStarted?: () => void,
        onProgress?: (progress: number) => void,
        onPaused?: () => void,
    ): Promise<string>;
    fetchUserFiles(uid: string): Promise<string[]>;
}
