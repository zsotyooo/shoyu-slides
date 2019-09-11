import { ActionTree } from 'vuex';
import { RootState } from '@/core/app';
import { AdminState, MenuItem, AdminStatus } from '..';

export const actions: ActionTree<AdminState, RootState> = {
    setIsResponsiveAction({ commit }, isResponsive: boolean) {
        commit('setIsResponsive', isResponsive);
    },

    setIsDrawerOpenAction({ commit }, isDrawerOpen: boolean) {
        commit('setIsDrawerOpen', isDrawerOpen);
    },

    setIsDrawerMiniAction({ commit }, isDrawerMini: boolean) {
        commit('setIsDrawerMini', isDrawerMini);
    },

    toggleDrawerAction({ commit }) {
        commit('toggleDrawer');
    },

    toggleDrawerMiniAction({ commit }) {
        commit('toggleDrawerMini');
    },

    appendMenuAction({ commit }, items: MenuItem[]) {
        commit('appendMenu', items);
    },

    prependMenuAction({ commit }, items: MenuItem[]) {
        commit('prependMenu', items);
    },

    setStatusAction({ commit }, status: AdminStatus) {
        commit('setStatus', status);
    },

    setErrorAction({ commit }, error: string | null) {
        commit('setError', error);
    },

    setSuccessAction({ commit }, success: string | null) {
        commit('setSuccess', success);
    },
};
