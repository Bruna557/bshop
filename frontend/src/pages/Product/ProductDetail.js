import { useNavigate } from 'react-router'
import { useParams } from 'react-router'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { Button, Col, Row } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'

import { addToCart } from '../../services/mocks/cartService'
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

    const addProductToCart = () => {
        if (isLoggedIn) {
            addToCart(product)
                .then(() => {
                    toast.success(`${product.name} ${copy.added_to_cart}`)
                })
                .catch(() => toast.error(copy.something_went_wrong))
        } else {
            toast.error(copy.must_sign_in)
            navigate('/login')
        }
    }

    return (
        <>
            <Row className='product-detail'>
                    <Col xs={12} md={3} lg={3}>
                        <img src={product.image_url} alt='product'></img>
                    </Col>
                    <Col xs={12} md={9} lg={9}>
                        <h1 className='name'>{product.name}</h1>
                        <div>{product.description}</div>
                        {product.rating && <Rating rating={product.rating} />}
                        <div className='price'>${product.price}</div>
                        <Button variant='success' disabled>{copy.buy}</Button>
                        <Button variant='success' onClick={addProductToCart}>
                            <FontAwesomeIcon icon={faShoppingCart} size='lg' />
                        </Button>
                    </Col>
            </Row>
            {/* TODO: add recommendation */}
        </>
    )
}

export default ProductDetail
