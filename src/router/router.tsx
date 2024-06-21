import {createBrowserRouter} from "react-router-dom";
import HomePage from "../pages/home";
import Login from "../pages/login/login";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <HomePage/>
    },
    {
        path: "/activity",
        element: <div>Activity</div>,
        children: [
            // TODO
        ]
    },
    {
        path: "/attachment",
        children: [
            // TODO
        ]
    },
    {
        path: "/auth/login",
        element: <Login></Login>,
        children: [
            // TODO
        ]
    },
    {
        path: "/notification",
        children: [
            // TODO
        ]
    },
    {
        path: "/project",
        children: [
            // TODO
        ]
    },
    {
        path: "/project-member",
        children: [
            // TODO
        ]
    },
    {
        path: "/project-environment",
        children: [
            // TODO
        ]
    },
    {
        path: "/resource",
        children: [
            // TODO
        ]
    },
    {
        path: "/user-management",
        children: [
            // TODO
        ]
    },
    {
        path: "/password",
        children: [
            // TODO
        ]
    },
])