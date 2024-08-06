
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

const navLinks: NavLink[] = [
    {
      name: "Home",
      icon: HomeIcon,
      link: "/"
    },
    {
        name: "Project",
        icon: WorkIcon,
        children: [
            {
                name: "Project list",
                icon: WorkIcon,
                link: "/project",
            },
            {
                name: "Create project",
                icon: NoteAddIcon,
                link: "/project/create",

            },
        ]
    },
    {
        name: "Main",
        icon: HomeIcon,
        link: "/project:projectId",
    },
    {
        name: "Resources",
        icon: StorageIcon,
        children: [
            {
                name: "All",
                icon: StorageIcon,
                link: "/project/:projectId/resources/any",
            },
            {
                name: "Links",
                icon: LinkIcon,
                link: "/project/:projectId/resources/link",
            },
            {
                name: "Documentation",
                icon: DescriptionIcon,
                link: "/project/:projectId/resources/text",
            },
            {
                name: "Files",
                icon: InsertDriveFileIcon,
                link: "/project/:projectId/resources/attachment",
            },
            {
                name: "Secret",
                icon: LockIcon,
                link: "/project/:projectId/resources/secret",
            },
            {
                name: "Members",
                icon: GroupIcon,
                link: "/project-member/:projectId",
            },
        ]
    },
    {
        name: "User management",
        icon: AdminPanelSettingsIcon,
        link: "/user"
    },
    {
        name: "Activities",
        icon: EventIcon,
        link: "/activities"
    },
]

export default navLinks;
export type { NavLink };