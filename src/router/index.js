import { createBrowserRouter } from "react-router-dom";
import Layout from "../pages/Layout";
import Month from "../pages/Month";
import Year from "../pages/Year";
import New from "../pages/New";
import Login from "../pages/Login";
import Setting from "../pages/Setting";
import Test from '../pages/test'

export default createBrowserRouter([
    {
        path: '/login',
        element: <Login></Login>
    },
    {
        path: '/',
        element: <Layout></Layout>,
        children: [
            {
                index: true,
                element: <Month></Month>
            },
            {
                path: 'year',
                element: <Year></Year>
            },

        ]
    },
    {
        path: '/new',
        element: <New></New>
    },
    {
        path: '/setting',
        element: <Setting></Setting>
    },
    {
        path: '/test',
        element: <Test></Test>
    }


])