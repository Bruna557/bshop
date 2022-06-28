import { useNavigate } from 'react-router'
import { useParams } from 'react-router'
import { useSelector } from 'react-redux'
import { Button, Col, Row } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'

import { addProductToCart } from '../../utils/addProductToCart'
import { getProductById } from '../../store/productSlice'
import { getIsLoggedIn } from '../../store/userSlice'
import { getCopy } from '../../store/localizationSlice'
import Rating from '../../components/Rating/Rating'

import './ProductDetail.css'

const ProductDetail = () => {
    const navigate = useNavigate()
    const copy = useSelector(getCopy)
    const isLoggedIn = useSelector(getIsLoggedIn)
    const { id } = useParams()
    const product = useSelector(getProductById(id))

    return (
        <>
            {(!product || !product.id) ? <div className='error-msg'>{copy.something_went_wrong}</div> :
                <Row className='product-detail'>
                    <h1 className='name'>{product.name}</h1>
                    <Col xs={12} md={3} lg={3}>
                        <img src={product.image_url} alt='product'></img>
                    </Col>
                    <Col className='description' xs={12} md={9} lg={9}>
                        <div>{product.description}</div>
                        {product.rating && <Rating rating={product.rating} />}
                        <div className='price'>${product.price}</div>
                        <Button variant='success' disabled>{copy.buy}</Button>
                        <Button variant='success' onClick={() => addProductToCart(product, isLoggedIn, copy, navigate)}>
                            <FontAwesomeIcon icon={faShoppingCart} size='lg' />
                        </Button>
                    </Col>
                </Row>
            }
        </>
    )
}

export default ProductDetail
