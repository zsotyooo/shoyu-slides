export interface MenuItem {
    to: string;
    icon: string;
    text: string;
    slot: string;
}

export type AdminStatus = 'success' | 'error' | 'loading';

export interface AdminState {
    isResponsive: boolean;
    isDrawerOpen: boolean;
    isDrawerMini: boolean;
    menu: MenuItem[];
    status: AdminStatus | null;
    error: string | null;
    success: string | null;
}
