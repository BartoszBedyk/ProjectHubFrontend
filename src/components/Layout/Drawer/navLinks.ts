import {useTranslation} from "react-i18next";
import HomeIcon from '@mui/icons-material/Home';
import {SvgIconComponent} from "@mui/icons-material";
import WorkIcon from '@mui/icons-material/Work';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import StorageIcon from '@mui/icons-material/Storage';
import LinkIcon from '@mui/icons-material/Link';
import LockIcon from '@mui/icons-material/Lock';
import DescriptionIcon from '@mui/icons-material/Description';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import EventIcon from '@mui/icons-material/Event';
import GroupIcon from '@mui/icons-material/Group';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';

interface NavLink {
    name: string;
    icon: SvgIconComponent;
    link?: string;
    children?: NavLink[];
}

const useNavLinks = (): NavLink[] => {
    const {t} = useTranslation("drawer");

    return [
        {
            name: t('home'),
            icon: HomeIcon,
            link: "/"
        },
        {
            name: t("project"),
            icon: WorkIcon,
            children: [
                {
                    name: t('projectList'),
                    icon: WorkIcon,
                    link: "/project",
                },
                {
                    name: t('addProject'),
                    icon: NoteAddIcon,
                    link: "/project/create",
                },
            ]
        },
        {
            name: t('main'),
            icon: HomeIcon,
            link: "/project:projectId",
        },
        {
            name: t('resources'),
            icon: StorageIcon,
            children: [
                {
                    name: t('all'),
                    icon: StorageIcon,
                    link: "/project/:projectId/resources/any",
                },
                {
                    name: t('resourcesLink'),
                    icon: LinkIcon,
                    link: "/project/:projectId/resources/link",
                },
                {
                    name: t('resourcesDocumentation'),
                    icon: DescriptionIcon,
                    link: "/project/:projectId/resources/text",
                },
                {
                    name: t('resourcesFiles'),
                    icon: InsertDriveFileIcon,
                    link: "/project/:projectId/resources/attachment",
                },
                {
                    name: t('resourcesSecret'),
                    icon: LockIcon,
                    link: "/project/:projectId/resources/secret",
                },
                {
                    name: t('resourcesMembers'),
                    icon: GroupIcon,
                    link: "/project/:projectId/resources/members",
                },
            ]
        },
        {
            name: t('userManagement'),
            icon: AdminPanelSettingsIcon,
            link: "/user"
        },
        {
            name: t('activities'),
            icon: EventIcon,
            link: "/"
        },
    ];
};

export default useNavLinks;
export type {NavLink};
