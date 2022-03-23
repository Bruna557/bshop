import { useReducer } from "react";
import { useSelector } from "react-redux";
import { Button, Col, Row } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

import Rating from "../../components/Rating";
import { getCart, removeFromCart } from "../../api";

import "./style.css";

function Cart() {
    const copy = useSelector((state) => state.localization.copy);

    var products = getCart();
    var total_price = products.reduce((sum, product) => sum + parseFloat(product.price), 0);

    const [, forceUpdate] = useReducer(x => x + 1, 0);

    const deleteItem = (id) => {
        removeFromCart(id);
        products = getCart();
        forceUpdate();
    }

    return (
        <>
            {products.length === 0 ? <h1>{copy.cart_empty}</h1> :
                <Row xs={1} md={2}>
                    <Col>
                        <h5>{copy.cart}</h5>
                        {products.map((product, id) => (
                            <Row key={id} className="cart-item">
                                <Col>
                                    <img src={product.image_url} alt="product"></img>
                                </Col>
                                <Col>
                                    <div className="item-name">{product.name}</div>
                                    <div className="item-price">${product.price}</div>
                                    <Rating rating={product.rating} />
                                </Col>
                                <Col>
                                    <Button variant="dark" onClick={() => deleteItem(id)}>
                                        <FontAwesomeIcon icon={faTrash} size="xs" />
                                    </Button>
                                </Col>
                            </Row>
                        ))}
                    </Col>
                    <Col className="cart-summary">
                        <h5>{copy.order_summary}</h5>
                        <div className="price">
                            <span>{copy.price}: </span>
                            <span>${total_price.toFixed(2)}</span>
                        </div>
                        <div className="price">
                            <span>{copy.discount}: </span>
                            <span>$0.00</span>
                        </div>
                        <div className="price">
                            <span>{copy.shipping}: </span>
                            <span>$0.00</span>
                        </div>
                        <hr></hr>
                        <div className="total">
                            <span>{copy.total}:</span>
                            <span>${total_price.toFixed(2)}</span>
                        </div>
                        <Button variant="success" className="buy-btn">{copy.buy}</Button>
                    </Col>
                </Row>
            }
        </>
    );
}

export default Cart;
