import { Outlet } from "react-router-dom";
import { ToastContainer } from 'react-toastify';

import Navigation from "../../components/Navigation";

import 'react-toastify/dist/ReactToastify.css';
import "./style.css";

const BaseLayout = () => {
    return (
        <>
            <Navigation />
            <div className="content">
                <ToastContainer
                    position="top-right"
                    autoClose={5000}
                    hideProgressBar
                    newestOnTop
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss={false}
                    draggable
                    pauseOnHover={false}>
                </ToastContainer>
                <Outlet />
            </div>
        </>
    );
}

export default BaseLayout;
