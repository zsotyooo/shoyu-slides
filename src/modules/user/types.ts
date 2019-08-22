import { UserInfo } from 'firebase';
import { Document } from '@/modules/firebase/types';

export interface User {
    uid: string;
    displayName: string;
    photoUrl: string;
}

export interface UserDocument extends Document {
    data: User;
}

export interface UserState {
    users: User[] | null;
    currentUser: User | null;
}
