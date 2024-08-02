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
import PrivateRoute from "../components/Login/PrivateRoute";


export const router = createBrowserRouter([
    {
        path: "/",
        element:(<PrivateRoute> <HomePage/> </PrivateRoute>),
        errorElement: <Error/>
    },


    /** AUTH **/

    {
        path: "/auth/login",
        element: <Login></Login>,
        errorElement: <Error/>
    },
    {
        path: "/auth/register",
        element: <div>Register</div>,
        errorElement: <Error/>
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
        element:(<PrivateRoute> <UserManagement/> </PrivateRoute>),
        errorElement: <Error/>
    },
    {
        path: "/user/create",
        element:(<PrivateRoute> <CreateUser/> </PrivateRoute>),
        errorElement: <Error/>
    },
    {
        path: "/user/edit/:userId",
        element:(<PrivateRoute> <UpdateUser/> </PrivateRoute>),
        errorElement: <Error/>
    },

    /** PROJECT **/
    {
        path: "/project",
        element:(<PrivateRoute> <Projects/> </PrivateRoute>),
        errorElement: <Error/>
    },
    {
        path: "/project/:projectId",
        element:(<PrivateRoute> <ProjectPageComponent/> </PrivateRoute>),
        errorElement: <Error/>
    },
    {
        path: "/project/create",
        element:(<PrivateRoute> <CreateProject/> </PrivateRoute>),
        errorElement: <Error/>
    },
    {
        path: "/project/edit/:projectId",
        element:(<PrivateRoute> <UpdateProject/> </PrivateRoute>),
        errorElement: <Error/>
    },

    /** PROJECT MEMBER **/

    {
        path: "/project-member/create/:projectId",
        element:(<PrivateRoute> <CreateProjectMember/> </PrivateRoute>),
        errorElement: <Error/>
    },
    {
        path: "/project-member/:projectId",
        element:(<PrivateRoute> <ProjectMembers/> </PrivateRoute>),
        errorElement: <Error/>
    },
    {
        path: "/project-member/:projectId/:userId",
        element:(<PrivateRoute> <ProjectMemberPage/> </PrivateRoute>),
        errorElement: <Error/>
    },
    {
        path: "/project-member/edit/:projectId/:userId",
        element:(<PrivateRoute> <UpdateProjectMember/> </PrivateRoute>),
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
        element: (
            <PrivateRoute>
                <Resources></Resources>
            </PrivateRoute>
        ),
        errorElement: <Error/>
    },
    {
        path: "/project/:projectId/resources/edit/:resourceId",
        element: (<PrivateRoute>
                    <UpdateResource></UpdateResource>
                 </PrivateRoute>
        ),

        errorElement: <Error/>
    }, {
        path: "/project/:projectId/resources/details/:resourceId",
        element:
            (
                <PrivateRoute>
                    <Resource></Resource>,
                </PrivateRoute>
            ),

        errorElement: <Error/>
    },
    {
        path: "/project/:projectId/resources/create",
        element: (
            <PrivateRoute>
                <CreateResource/>
            </PrivateRoute>
        ),
    }

])

