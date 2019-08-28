import * as firebase from 'firebase/app';
import { Document, Filter } from '..';

export class DbService {
    constructor(
        private db: firebase.firestore.Firestore,
    ) { }

    public async getDocument<D extends Document = Document>(
        collectionId: string,
        documentId: string): Promise<D | false> {
        try {
            const doc = await this.db.collection(collectionId)
                .doc(documentId)
                .get();
            if (doc.exists) {
                return Promise.resolve({
                    id: doc.id,
                    data: doc.data(),
                } as D);
            } else {
                return Promise.resolve(false as false);
            }
        } catch (e) {
            console.error('Error while getting document!', e);
            return Promise.reject(e);
        }
    }

    public async setDocument<D extends Document = Document>(collectionId: string, payload: D): Promise<D> {
        try {
            await this.db.collection(collectionId).doc(payload.id)
                .set(payload.data);
            return Promise.resolve(payload);
        } catch (e) {
            console.error('Error setting a document!', e);
            return Promise.reject(e);
        }
    }

    public async addDocument<
        D extends Document = Document,
        DD extends firebase.firestore.DocumentData = firebase.firestore.DocumentData
    >(
        collectionId: string,
        payload: DD,
    ): Promise<D> {
        try {
            const res = await this.db.collection(collectionId)
                .add(payload);
            return Promise.resolve({id: res.id, data: {}} as D);
        } catch (e) {
            console.error('Error setting a document!', e);
            return Promise.reject(e);
        }
    }

    public async getCollection<D extends Document = Document>(collectionId: string, filter?: Filter): Promise<D[]> {
        try {
            let querySnapshot: firebase.firestore.QuerySnapshot;
            if (filter) {
                querySnapshot = await this.db.collection(collectionId)
                    .where(filter.fieldPath, filter.opStr, filter.value)
                    .get();
            } else {
                querySnapshot = await this.db.collection(collectionId)
                    .get();
            }
            const documents: D[] = [];
            querySnapshot.forEach((doc) => {
                documents.push({
                    id: doc.id,
                    data: doc.data(),
                } as D);
            });
            return Promise.resolve(documents);
        } catch (e) {
            console.error('Error getting collection!', e);
            return Promise.reject(e);
        }
    }

    // TODO: refactor these:
    // removeDocument(collectionId: string, documentId: string) {
    //     return new Promise((resolve, reject) => {
    //         this.db.collection(collectionId)
    //             .doc(documentId)
    //             .delete()
    //             .then(() => {
    //                 console.log("Document successfully deleted!");
    //                 resolve();
    //             })
    //             .catch(error => {
    //                 console.error("Error removing document: ", error);
    //                 reject(error);
    //             });
    //     });
    // }

    // removeDocuments(collectionId: string, documentIds: string[]) {
    //     console.log("here" + documentIds);
    //     return new Promise((resolve, reject) => {
    //         const batch = this.db.batch();

    //         documentIds.forEach(element => {
    //             let ref = this.db.collection(collectionId).doc(element);
    //             batch.delete(ref);
    //         });

    //         batch
    //             .commit()
    //             .then(() => {
    //                 console.log("Documents successfully deleted!");
    //                 resolve();
    //             })
    //             .catch(error => {
    //                 console.error("Error removing document: ", error);
    //                 reject(error);
    //             });
    //     });
    // }

    // addDocument(
    // collectionId: string,
    // payload: firebase.firestore.DocumentData): Promise<firebase.firestore.DocumentReference> {
    //     return new Promise((resolve, reject) => {
    //         this.db.collection(collectionId)
    //             .add(payload)
    //             .then(response => resolve(response))
    //             .catch(err => reject(err));
    //     });
    // }

    // public updateDocument(collectionId: string, payload: Document): Promise<void> {
    //     return new Promise((resolve, reject) => {
    //         const docRef = this.db.collection(collectionId).doc(payload.id);
    //         docRef
    //             .update(payload.data as firebase.firestore.DocumentData)
    //             .then(() => resolve())
    //             .catch((err) => reject(err));
    //     });
    // }
}
