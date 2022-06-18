import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Button, Card, Col, Row } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'

import { getProductList } from '../../store/productSlice'
import { getCopy } from '../../store/localizationSlice'
import processAddToCart from '../../utils/processAddToCart'
import Rating from '../Rating/Rating'

import './Grid.css'

const Grid = () => {
    const products = useSelector(getProductList)
    const copy = useSelector(getCopy)

    return (
        <Row xs={1} md={4} className='g-4'>
            {products.map((product, i) => (
                <Col key={i}>
                    <Card>
                        <Card.Img variant='top' src={product.image_url} alt='product' />
                        <Card.Title>{product.name}</Card.Title>
                        <Card.Body>
                            <Card.Text>${product.price}</Card.Text>
                            <Rating rating={product.rating} />
                            <div className='footer'>
                                <Button variant='success' onClick={() => processAddToCart(product, copy)}>
                                    <FontAwesomeIcon icon={faShoppingCart} size='lg' />
                                </Button>
                                <Link to={`/product/${product.id}`}><Button variant='primary'>{copy.see_more}</Button></Link>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            ))}
        </Row>
    )
}

export default Grid
