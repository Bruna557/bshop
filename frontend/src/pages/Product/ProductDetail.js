import { useParams } from 'react-router'
import { useSelector } from 'react-redux'
import { Button, Col, Row } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'

import { getProductById } from '../../store/productSlice'
import { getCopy } from '../../store/localizationSlice'
import Rating from '../../components/Rating/Rating'
import processAddToCart from '../../utils/processAddToCart'

import './ProductDetail.css'

const ProductDetail = () => {
    const copy = useSelector(getCopy)
    const { id } = useParams()
    const product = useSelector(getProductById(id))

    return (
        <>
            <Row className='product-detail'>
                <h1 className='name'>{product.name}</h1>
                <Col>
                    <img src={product.image_url} alt='product'></img>
                </Col>
                <Col>
                    <div>{product.description}</div>
                    {product.rating && <Rating rating={product.rating} />}
                </Col>
                <Col>
                    <div className='price'>${product.price}</div>
                    <Button variant='success' disabled>{copy.buy}</Button>
                    <Button variant='success' onClick={() => processAddToCart(product, copy)}>
                        <FontAwesomeIcon icon={faShoppingCart} size='lg' />
                    </Button>
                </Col>
            </Row>
            {/* TODO: add recommendation */}
        </>
    )
}

export default ProductDetail
