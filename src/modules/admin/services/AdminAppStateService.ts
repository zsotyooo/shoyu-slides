import { injectable, inject } from 'inversify';
import { Commit } from 'vuex';
import { Application } from '@/core';
import { AppStateService } from '@/modules/app';

@injectable()
export class AdminAppStateService implements AppStateService {
    private commitFn: Commit;

    constructor(
        @inject('app') private app: Application,
    ) {
        this.commitFn = this.app.getStore().commit;
    }

    public setError(msg: string | null) {
        this.commit('setStatus', 'error');
        this.commit('setError', msg);
        this.commit('setSuccess', null);
    }

    public setSuccess(msg: string | null) {
        this.commit('setStatus', 'success');
        this.commit('setSuccess', msg);
        this.commit('setError', null);
    }

    public setLoading() {
        this.commit('setStatus', 'loading');
    }

    private commit(mutation: string, payload?: any) {
        this.commitFn(`admin/${mutation}`, payload, { root: true });
    }
}
