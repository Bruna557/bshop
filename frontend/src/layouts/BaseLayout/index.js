import { Outlet } from "react-router-dom";

import Navigation from "../../components/Navigation";

import "./style.css";

const BaseLayout = () => {
    return (
        <>
            <Navigation />
            <div className="content">
                <Outlet />
            </div>
        </>
    );
}

export default BaseLayout;
