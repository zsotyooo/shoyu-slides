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

export interface UserService {
    fetchUser: (uid: string) => Promise<false | UserDocument>;
    saveUser: (user: UserDocument) => Promise<UserDocument>;
}
