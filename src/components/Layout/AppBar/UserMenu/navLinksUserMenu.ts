import { useTranslation } from 'react-i18next';
import {getUserId} from "../../../../storage/AuthStorage";

interface NavLinksUserMenu {
    name: string;
    link?: string;
}

const useNavLinksUserMenu = (): NavLinksUserMenu[] => {
    const { t } = useTranslation('drawer');
    const userId = getUserId()
    return [
        {
            name: t('profile'),
            link: `/user/${userId}`,
        },
        {
            name: t('settings'),
            link: '/settings',
        },
        {
            name: 'Logout',
        }
    ];
};

export default useNavLinksUserMenu;
export type { NavLinksUserMenu };
