import {createBrowserRouter} from "react-router-dom";
import HomePage from "../pages/home/home";
import Login from "../pages/login/login";
import Error from "../pages/error/error";
import Resources from "../pages/resources/resources";

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
        path: "/user/edit",
        element: <div>Edit user</div>,
        errorElement: <Error/>
    },

    /** PROJECT **/
    {
        path: "/project/:projectId",
        element: <div>Project</div>,
        errorElement: <Error/>
    },
    {
        path: "/project/create",
        element: <div>Create Project</div>,
        errorElement: <Error/>
    },
    {
        path: "/project/edit",
        element: <div>Edit Project</div>,
        errorElement: <Error/>
    },

    /** PROJECT MEMBER **/

    {
        path: "/project-member/create",
        element: <div>Create Project Member</div>,
        errorElement: <Error/>
    },
    {
        path: "/project-member/edit",
        element: <div>Edit Project Member</div>,
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
        path: "/project/resources/:type",
        element: <Resources></Resources>,
        errorElement: <Error/>
    },

])