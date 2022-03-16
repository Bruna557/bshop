import { useParams } from "react-router";
import { useSelector } from "react-redux";

function Product() {
    const { id } = useParams();
    const product = useSelector((state) => state.products.value)[id];

    return (
        <>
            <h1>{product.name}</h1>
            <img src={product.image_url} alt="product"></img>
            <p>{product.description}</p>
            <p>{product.price}</p>
        </>
    );
}

export default Product;
