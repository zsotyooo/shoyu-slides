import { MutationTree } from 'vuex';
import { AdminState, MenuItem, AdminStatus } from '..';

export const mutations: MutationTree<AdminState> = {
    setIsResponsive(state, isResponsive: boolean) {
        state.isResponsive = isResponsive;
    },

    setIsDrawerOpen(state, isDrawerOpen: boolean) {
        state.isDrawerOpen = isDrawerOpen;
    },

    setIsDrawerMini(state, isDrawerMini: boolean) {
        state.isDrawerMini = isDrawerMini;
    },

    toggleDrawer(state) {
        state.isDrawerOpen = !state.isDrawerOpen;
    },

    toggleDrawerMini(state) {
        state.isDrawerMini = !state.isDrawerMini;
    },

    appendMenu(state, items: MenuItem[]) {
        state.menu = [ ...state.menu, ...items ];
    },

    prependMenu(state, items: MenuItem[]) {
        state.menu = [ ...items, ...state.menu ];
    },

    setStatus(state, status: AdminStatus) {
        state.status = status;
    },

    setError(state, error: string | null) {
        state.error = error;
    },

    setSuccess(state, success: string | null) {
        state.success = success;
    },
};
