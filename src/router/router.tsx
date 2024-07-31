import {createBrowserRouter} from "react-router-dom";
import HomePage from "../pages/home/home";
import Login from "../pages/login/login";
import Error from "../pages/error/error";
import CreateProject from "../pages/project/CreateProject";
import UpdateProject from "../pages/project/UpdateProject";
import ProjectPageComponent from "../pages/project/Project";
import Projects from "../pages/project/Projects";
import CreateUser from "../pages/user-management/CreateUser";
import UpdateUser from "../pages/user-management/UpdateUser";
import UserManagement from "../pages/user-management/UserManagement";
import ProjectMembers from "../pages/projectMember/ProjectMembers";
import ProjectMemberPage from "../pages/projectMember/ProjectMember";
import CreateProjectMember from "../pages/projectMember/CreateProjectMember";
import UpdateProjectMember from "../pages/projectMember/UpdateProjectMember";
import {CreateResource} from "../pages/resources/CreateResource";
import UpdateResource from "../pages/resources/UpdateResource";
import Resources from "../pages/resources/Resources";
import React from "react";
import {Edit} from "@mui/icons-material";
import Resource from "../pages/resources/Resource";


export const router = createBrowserRouter([
    {
        path: "/",
        element: <HomePage/>,
        errorElement: <Error />
    },

    /** AUTH **/

    {
        path: "/auth/login",
        element: <Login></Login>,
        errorElement: <Error />
    },
    {
        path: "/auth/register",
        element: <div>Register</div>,
        errorElement: <Error />
    },
    {
        path: "/auth/reset-password",
        element: <div>Reset password</div>,
        errorElement: <Error/>
    },

    /** USER **/

    {
        path: "/user/change-password",
        element: <div>Change password</div>,
        errorElement: <Error/>
    },
    {
        path: "/user",
        element: <UserManagement />,
        errorElement: <Error/>
    },
    {
        path: "/user/create",
        element: <CreateUser />,
        errorElement: <Error/>
    },
    {
        path: "/user/edit/:userId",
        element: <UpdateUser />,
        errorElement: <Error/>
    },

    /** PROJECT **/
    {
        path: "/project",
        element: <Projects/>,
        errorElement: <Error/>
    },
    {
        path: "/project/:projectId",
        element: <ProjectPageComponent/>,
        errorElement: <Error/>
    },
    {
        path: "/project/create",
        element: <CreateProject/>,
        errorElement: <Error/>
    },
    {
        path: "/project/edit/:projectId",
        element: <UpdateProject/>,
        errorElement: <Error/>
    },

    /** PROJECT MEMBER **/

    {
        path: "/project-member/create/:projectId",
        element: <CreateProjectMember/>,
        errorElement: <Error/>
    },
    {
        path: "/project-member/:projectId",
        element: <ProjectMembers/>,
        errorElement: <Error/>
    },
    {
        path: "/project-member/:projectId/:userId",
        element: <ProjectMemberPage/>,
        errorElement: <Error/>
    },
    {
        path: "/project-member/edit/:projectId/:userId",
        element: <UpdateProjectMember/>,
        errorElement: <Error/>
    },

    /** PROJECT ENVIRONMENT **/

    {
        path: "/project-environment/create",
        element: <div>Create Project Environment</div>,
        errorElement: <Error/>
    },
    {
        path: "/project-environment/edit",
        element: <div>Edit Project Environment</div>,
        errorElement: <Error/>
    },

    /** RESOURCES **/
    {
        path: "/project/:projectId/resources/:type",
        element: <Resources></Resources>,
        errorElement: <Error/>
    },
    {
        path:"/project/:projectId/resources/edit/:id",
        element:<UpdateResource></UpdateResource>,
        errorElement: <Error/>
    },{
        path:"/project/:projectId/resources/details/:id",
        element:<Resource></Resource>,
        errorElement: <Error/>
    },
    {
        path:"/project/:projectId/resources/create",
        element:<CreateResource></CreateResource>
    }

])