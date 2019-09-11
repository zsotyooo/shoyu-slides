import { GetterTree } from 'vuex';
import { RootState } from '@/core/app';
import { AdminState, MenuItem, AdminStatus } from '..';

export const getters: GetterTree<AdminState, RootState> = {
    isResponsive(state): boolean {
        const { isResponsive } = state;
        return isResponsive;
    },
    isDrawerOpen(state): boolean {
        const { isDrawerOpen } = state;
        return isDrawerOpen;
    },
    isDrawerMini(state): boolean {
        const { isDrawerMini } = state;
        return isDrawerMini;
    },
    menu(state): MenuItem[] {
        const { menu } = state;
        return menu;
    },
    error(state): string | null {
        const { error } = state;
        return error;
    },
    success(state): string | null {
        const { success } = state;
        return success;
    },
    status(state): AdminStatus | null {
        const { status } = state;
        return status;
    },
};
