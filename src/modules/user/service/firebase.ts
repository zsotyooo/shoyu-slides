import { db } from '@/modules/firebase';
import { UserDocument } from '../';

export const fetchUser = async (uid: string) => db().getDocument<UserDocument>('users', uid);

export const saveUser = async (user: UserDocument) => db().setDocument<UserDocument>('users', user);
