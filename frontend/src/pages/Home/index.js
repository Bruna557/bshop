import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { update } from "../../store/productSlice";
import { getProducts, addToCart } from "../../api";

import Grid from "../../components/Grid";

const Home = () => {
    const copy = useSelector((state) => state.localization.copy);
    const products = getProducts();
    const dispatch = useDispatch();

    dispatch(update(products));

    function addToCartFunc(productId) {
        addToCart(products[productId]);
        toast.success(`${products[productId].name} ${copy.added_to_cart}`);
    }

    return (
        <>
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
            <Grid addToCart={addToCartFunc}/>
        </>
    );
}

export default Home;
