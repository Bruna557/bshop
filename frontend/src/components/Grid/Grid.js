import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { Button, Card, Col, Row } from 'react-bootstrap'
import Pagination from 'react-bootstrap/Pagination'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'

import { addToCart } from '../../services/mocks/cartService'
import { getProductList, getProductPagination } from '../../store/productSlice'
import { getCopy } from '../../store/localizationSlice'
import { getIsLoggedIn } from '../../store/userSlice'
import { fetchProductsThunk } from '../../store/productThunks'
import Rating from '../Rating/Rating'

import './Grid.css'

const Grid = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const products = useSelector(getProductList)
    const copy = useSelector(getCopy)
    const isLoggedIn = useSelector(getIsLoggedIn)
    const {currentPage, numberOfPages} = useSelector(getProductPagination)

    const nextPage = () => {
        const page = currentPage + 1
        dispatch(fetchProductsThunk(page))
    }

    const previousPage = () => {
        const page = currentPage - 1
        dispatch(fetchProductsThunk(page))
    }

    const addProductToCart = (product) => {
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
            <Row  xs={1} sm={2} md={4} lg={4}>
                {products.map((product, i) => (
                    <Col key={i}>
                        <Card>
                            <Card.Img variant='top' src={product.image_url} alt='product' />
                            <Card.Title>{product.name}</Card.Title>
                            <Card.Body>
                                <Card.Text>${product.price}</Card.Text>
                                <Rating rating={product.rating} />
                                <div className='footer'>
                                    <Button variant='success' onClick={() => addProductToCart(product)}>
                                        <FontAwesomeIcon icon={faShoppingCart} size='lg' />
                                    </Button>
                                    <Link to={`/product/${product.id}`}><Button variant='primary'>{copy.see_more}</Button></Link>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
            <Row>
                <Pagination>
                    {currentPage > 1 && <Pagination.Prev onClick={previousPage}/>}
                    <Pagination.Item>{currentPage}</Pagination.Item>
                    {currentPage < numberOfPages && <Pagination.Next onClick={nextPage}/>}
                </Pagination>
            </Row>
        </>
    )
}

export default Grid
