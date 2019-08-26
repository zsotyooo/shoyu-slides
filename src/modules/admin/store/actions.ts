import { ActionTree } from 'vuex';
import { RootState } from '@/modules/store';
import { AdminState, MenuItem } from '..';

export const actions: ActionTree<AdminState, RootState> = {
    setIsResponsiveAction({ commit }, isResponsive: boolean) {
        commit('setIsResponsive', isResponsive);
    },

    setIsDrawerOpenAction({ commit }, isDrawerOpen: boolean) {
        commit('setIsDrawerOpen', isDrawerOpen);
    },

    toggleDrawerAction({ commit }) {
        commit('toggleDrawer');
    },

    appendMenuAction({ commit }, items: MenuItem[]) {
        commit('appendMenu', items);
    },

    prependMenuAction({ commit }, items: MenuItem[]) {
        commit('prependMenu', items);
    },
};
