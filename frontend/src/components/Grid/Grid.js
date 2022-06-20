import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Button, Card, Col, Row } from 'react-bootstrap'
import Pagination from 'react-bootstrap/Pagination'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'

import { getProductList, getProductPagination } from '../../store/productSlice'
import { getCopy } from '../../store/localizationSlice'
import { fetchProductsThunk } from '../../store/productThunks'
import processAddToCart from '../../utils/processAddToCart'
import Rating from '../Rating/Rating'

import './Grid.css'

const Grid = () => {
    const dispatch = useDispatch()
    const products = useSelector(getProductList)
    const copy = useSelector(getCopy)
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
