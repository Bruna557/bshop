import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { Button, Card, Col, Row } from 'react-bootstrap'
import Pagination from 'react-bootstrap/Pagination'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'

import { getProductList, getProductPagination } from '../../store/productSlice'
import { getCopy } from '../../store/localizationSlice'
import { getIsLoggedIn } from '../../store/userSlice'
import { fetchProductsThunk } from '../../store/productThunks'
import { addProductToCart } from '../../utils/addProductToCart'
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

    return (
        <>
            {(!products || products.length === 0) ? <p className='no-results'>{copy.no_results}</p> :
                <>
                    <Row  xs={1} sm={2} md={4} lg={4}>
                        {products.map((product, i) => (
                            <Col key={i}>
                                <Card className='product'>
                                    <Card.Img variant='top' src={product.image_url} alt='product' />
                                    <Card.Title>{product.name}</Card.Title>
                                    <Card.Body>
                                        <Card.Text>${product.price}</Card.Text>
                                        <Rating rating={product.rating} />
                                        <div className='footer'>
                                            <Button
                                                variant='success'
                                                onClick={() => addProductToCart(product, isLoggedIn, copy, navigate)}>
                                                <FontAwesomeIcon icon={faShoppingCart} size='lg' />
                                            </Button>
                                            <Link to={`/product/${product.id}`}><Button variant='primary'>{copy.see_more}</Button></Link>
                                        </div>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                    <Pagination>
                        {currentPage > 1 && <Pagination.Prev onClick={previousPage}/>}
                        <Pagination.Item>{currentPage}</Pagination.Item>
                        {currentPage < numberOfPages && <Pagination.Next onClick={nextPage}/>}
                    </Pagination>
                </>
            }
        </>
    )
}

export default Grid
