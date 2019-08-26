import { MutationTree } from 'vuex';
import { AdminState, MenuItem } from '..';

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

    appendMenu(state, items: MenuItem[]) {
        state.menu = [ ...state.menu, ...items ];
    },

    prependMenu(state, items: MenuItem[]) {
        state.menu = [ ...items, ...state.menu ];
    },
};
