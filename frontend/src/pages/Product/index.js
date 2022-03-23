import { useParams } from "react-router";
import { useSelector } from "react-redux";
import { Button, Col, Row } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";

import Rating from "../../components/Rating";
import { addToCartFunc } from "../../utils";

import "./style.css";

function Product() {
    const copy = useSelector((state) => state.localization.copy);
    const { id } = useParams();
    const product = useSelector((state) => state.product.productList)[id];

    return (
        <>
            <Row className="product-detail">
                <h1 className="name">{product.name}</h1>
                <Col>
                    <img src={product.image_url} alt="product"></img>
                </Col>
                <Col>
                    <div>{product.description}</div>
                    <Rating rating={product.rating} />
                </Col>
                <Col>
                    <div className="price">${product.price}</div>
                    <Button variant="success" disabled>{copy.buy}</Button>
                    <Button variant="success" onClick={() => addToCartFunc(product, copy.added_to_cart)}>
                        <FontAwesomeIcon icon={faShoppingCart} size="lg" />
                    </Button>
                </Col>
            </Row>
            {/* TODO: add recommendation */}
        </>
    );
}

export default Product;
