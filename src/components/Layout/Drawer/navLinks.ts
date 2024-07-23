import projectsIcon from "../../../assets/Drawer/icon-nav-projects.png";
import newProjectIcon from "../../../assets/Drawer/icon-nav-new-project.png";
import documentationIcon from "../../../assets/Drawer/icon-nav-documantation.png";
import filesIcon from "../../../assets/Drawer/icon-nav-files.png";
import homeIcon from "../../../assets/Drawer/icon-nav-home.png";
import linksIcon from "../../../assets/Drawer/icon-nav-links.png";
import membersIcon from "../../../assets/Drawer/icon-nav-members.png";
import resourcesIcon from "../../../assets/Drawer/icon-nav-resources.png";
import userManagementIcon from "../../../assets/Drawer/icon-nav-user-management.png";
import activitiesIcon from "../../../assets/Drawer/icon-nav-activities.png";

interface NavLink {
    name: string;
    icon: string;
    link: string;
    children?: NavLink[];
}

const navLinks: NavLink[] = [
    {
      name: "Home",
      icon: homeIcon,
      link: "/"
    },
    {
        name: "Project",
        icon: projectsIcon,
        link: "/",
        children: [
            {
                name: "Create project",
                icon: newProjectIcon,
                link: "/project/create",

            },
        ]
    },
    {
        name: "Main",
        icon: homeIcon,
        link: "/project:projectId",
    },
    {
        name: "Resources",
        icon: resourcesIcon,
        link: "/project/resources/any",
        children: [
            {
                name: "Links",
                icon: linksIcon,
                link: "/project/resources/link",
            },
            {
                name: "Documentation",
                icon: documentationIcon,
                link: "/project/resources/text",
            },
            {
                name: "Files",
                icon: filesIcon,
                link: "/project/resources/attachment",
            },
            {
                name: "Secret",
                icon: filesIcon,
                link: "/project/resources/secret",
            },
            {
                name: "Members",
                icon: membersIcon,
                link: "/project/resources/members",
            },
        ]
    },
    {
        name: "User management",
        icon: userManagementIcon,
        link: "/"
    },
    {
        name: "Activities",
        icon: activitiesIcon,
        link: "/"
    },
]

export default navLinks;
export type { NavLink };