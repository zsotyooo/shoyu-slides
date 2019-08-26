import { GetterTree } from 'vuex';
import { RootState } from '@/modules/store';
import { AdminState } from '..';
import { MenuItem } from '../types';

export const getters: GetterTree<AdminState, RootState> = {
    isResponsive(state): boolean {
        const { isResponsive } = state;
        return isResponsive;
    },
    isDrawerOpen(state): boolean {
        const { isDrawerOpen } = state;
        return isDrawerOpen;
    },
    menu(state): MenuItem[] {
        const { menu } = state;
        return menu;
    },
};
