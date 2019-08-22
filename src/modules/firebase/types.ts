import * as firebase from 'firebase/app';

export interface EmailAuthCredentials {
    email: string;
    password: string;
}

export interface Document {
    id: string;
    data: firebase.firestore.DocumentData;
}

export interface Filter {
    fieldPath: string | firebase.firestore.FieldPath;
    opStr: firebase.firestore.WhereFilterOp;
    value: any;
}
