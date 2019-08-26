export interface MenuItem {
    to: string;
    icon: string;
    text: string;
}

export interface AdminState {
    isResponsive: boolean;
    isDrawerOpen: boolean;
    menu: MenuItem[];
}
