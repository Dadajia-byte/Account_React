import { Outlet } from "react-router-dom";

const Layout = () => {
    return (<div>
        <Outlet></Outlet>
        我是layout
    </div>)
}

export default Layout;