import Grid from "../../components/Grid";

import { getProducts } from "../../api";

const Home = () => {
    return (
        <>
            <h1>Catalog</h1>
            <Grid products={getProducts()} />
        </>
    );
}

export default Home;
