import { MutationTree } from 'vuex';
import { AdminState } from '..';

export const mutations: MutationTree<AdminState> = {
    setIsResponsive(state, isResponsive: boolean) {
        state.isResponsive = isResponsive;
    },

    setIsDrawerOpen(state, isDrawerOpen: boolean) {
        state.isDrawerOpen = isDrawerOpen;
    },

    toggleDrawer(state) {
        state.isDrawerOpen = !state.isDrawerOpen;
    },
};
