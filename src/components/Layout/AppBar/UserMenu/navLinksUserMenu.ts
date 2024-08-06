import {getUserId} from "../../../../storage/AuthStorage";

interface NavLinksUserMenu {
    name: string;
    link: string;
}

const navLinksUserMenu: NavLinksUserMenu[] = [
    {
        name: 'Profile',
        link: `/user/:userId`
    },
    {
        name: 'Settings',
        link: '/settings'
    }
]

export default navLinksUserMenu;
export type { NavLinksUserMenu }