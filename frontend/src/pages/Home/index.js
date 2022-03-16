import { useDispatch } from "react-redux";

import { update } from "../../store/productSlice";
import { getProducts } from "../../api";

import Grid from "../../components/Grid";

const Home = () => {
    const products = getProducts();
    const dispatch = useDispatch()
    dispatch(update(products))

    return (
        <>
            <Grid />
        </>
    );
}

export default Home;
