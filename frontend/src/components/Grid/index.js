import { Card, Col, Row } from "react-bootstrap";

import Rating from "../Rating";

import "./style.css";

const Grid = (props) => {
    return (
        <Row xs={1} md={4} className="g-4">
            {props.products.map((product, id) => (
                <Col key={id}>
                <Card>
                    <Card.Img variant="top" src={product.image_url} />
                    <Card.Title>{product.name}</Card.Title>
                    <Card.Body>
                        <Card.Text>${product.price}</Card.Text>
                        <Rating rating={product.rating} />
                    </Card.Body>
                </Card>
                </Col>
            ))}
        </Row>
    );
}

export default Grid;
