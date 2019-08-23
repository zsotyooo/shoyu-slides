import { injectable, inject } from 'inversify';
import { db } from '@/modules/firebase';
import { UserDocument, UserService } from '..';

@injectable()
export class FirebaseUserService implements UserService {
    public async fetchUser(uid: string) {
        return db().getDocument<UserDocument>('users', uid);
    }

    public async saveUser(user: UserDocument) {
        return db().setDocument<UserDocument>('users', user);
    }
}
