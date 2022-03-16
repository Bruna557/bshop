import { useDispatch } from "react-redux";

import { update } from "../../store/productSlice";
import { getProducts, addToCart } from "../../api";

import Grid from "../../components/Grid";

const products = getProducts();

function addToCartFunc(productId) {
    addToCart(products[productId]);
    alert(`${products[productId].name} added to cart!`);
}

const Home = () => {
    const dispatch = useDispatch();
    dispatch(update(products));

    return (
        <>
            <Grid addToCart={addToCartFunc}/>
        </>
    );
}

export default Home;
