import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Button, Card, Col, Row } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";

import Rating from "../Rating";
import { addToCartFunc } from "../../utils";

import "./style.css";

const Grid = () => {
    const products = useSelector((state) => state.product.productList);
    const copy = useSelector((state) => state.localization.copy);

    return (
        <Row xs={1} md={4} className="g-4">
            {products.map((product, id) => (
                <Col key={id}>
                    <Card>
                        <Card.Img variant="top" src={product.image_url} alt="product" />
                        <Card.Title>{product.name}</Card.Title>
                        <Card.Body>
                            <Card.Text>${product.price}</Card.Text>
                            <Rating rating={product.rating} />
                            <div className="footer">
                                <Button variant="success" onClick={() => addToCartFunc(product, copy.added_to_cart)}>
                                    <FontAwesomeIcon icon={faShoppingCart} size="lg" />
                                </Button>
                                <Link to={`/product/${id}`}><Button variant="primary">{copy.see_more}</Button></Link>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            ))}
        </Row>
    );
}

export default Grid;
