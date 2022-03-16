import { Link } from "react-router-dom";
import { Button, Card, Col, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartPlus } from "@fortawesome/free-solid-svg-icons";

import Rating from "../Rating";

import "./style.css";

const Grid = (props) => {
    const products = useSelector((state) => state.products.value);

    return (
        <Row xs={1} md={4} className="g-4">
            {products.map((product, id) => (
                <Col key={id}>
                    <Card>
                        <Card.Img variant="top" src={product.image_url} />
                        <Card.Title>{product.name}</Card.Title>
                        <Card.Body>
                            <Card.Text>${product.price}</Card.Text>
                            <Rating rating={product.rating} />
                            <div className="footer">
                                <Button variant="success" onClick={() => props.addToCart(id)}>
                                    <FontAwesomeIcon icon={faCartPlus} size="lg" />
                                </Button>
                                <Link to={`/product/${id}`}><Button variant="primary">See more</Button></Link>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            ))}
        </Row>
    );
}

export default Grid;
