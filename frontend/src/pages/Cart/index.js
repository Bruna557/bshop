import { Button, Card, Col, Row } from "react-bootstrap";

import { getCart } from "../../api";

function Cart() {
    const products = getCart();
    console.log("products in cart: " + products.length);

    return (
        <>
            <Row xs={1} md={1} className="g-4">
            {products.map((product, id) => (
                <Col key={id}>
                    <Card>
                        <Card.Img variant="top" src={product.image_url} />
                        <Card.Title>{product.name}</Card.Title>
                        <Card.Body>
                            <Card.Text>${product.price}</Card.Text>
                            {/* <div className="footer">
                                <Button variant="success" onClick={this._addToCart(id)}>
                                    <FontAwesomeIcon icon={faCartPlus} size="lg" />
                                </Button>
                                <Link to={`/product/${id}`}><Button variant="primary">See more</Button></Link>
                            </div> */}
                        </Card.Body>
                    </Card>
                </Col>
            ))}
        </Row>
        </>
    );
}

export default Cart;
