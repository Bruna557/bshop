import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Button, Col, Row } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'

import Rating from '../../components/Rating/Rating'
import { getCopy } from '../../store/localizationSlice'
import { fetchCart, removeFromCart } from '../../services/mocks/cartService'

import './Cart.css'

const Cart = () => {
    const copy = useSelector(getCopy)
    const [cart, setCart] = useState([])
    const [totalPrice, setTotalPrice] = useState(0)

    useEffect(() => {
        fetchCart()
            .then((data) => {
                if (data) {
                    setCart(data)
                    setTotalPrice(data.reduce((sum, product) => sum + parseFloat(product.price), 0))
                }
            })
    }, [])

    const deleteItem = (id) => {
        removeFromCart(id)
            .then(() => {
                fetchCart()
                    .then((data) => {
                        setCart(data)
                        setTotalPrice(data.reduce((sum, product) => sum + parseFloat(product.price), 0))
                    })
            })
    }

    return (
        <>
            {cart.length === 0 ? <h1>{copy.cart_empty}</h1> :
                <Row xs={1} md={2}>
                    <Col>
                        <h5>{copy.cart}</h5>
                        {cart.map((product, i) => (
                            <Row key={i} className='cart-item'>
                                <Col>
                                    <img src={product.image_url} alt='product'></img>
                                </Col>
                                <Col>
                                    <div className='item-name'>{product.name}</div>
                                    <div className='item-price'>${product.price}</div>
                                    {product.rating && <Rating rating={product.rating} />}
                                </Col>
                                <Col>
                                    <Button variant='dark' onClick={() => deleteItem(product.id)}>
                                        <FontAwesomeIcon icon={faTrash} size='xs' />
                                    </Button>
                                </Col>
                            </Row>
                        ))}
                    </Col>
                    <Col className='cart-summary'>
                        <h5>{copy.order_summary}</h5>
                        <div className='price'>
                            <span>{copy.price}: </span>
                            <span>${totalPrice.toFixed(2)}</span>
                        </div>
                        <div className='price'>
                            <span>{copy.discount}: </span>
                            <span>$0.00</span>
                        </div>
                        <div className='price'>
                            <span>{copy.shipping}: </span>
                            <span>$0.00</span>
                        </div>
                        <hr></hr>
                        <div className='total'>
                            <span>{copy.total}:</span>
                            <span>${totalPrice.toFixed(2)}</span>
                        </div>
                        <Button variant='success' disabled className='buy-btn'>{copy.buy}</Button>
                    </Col>
                </Row>
            }
        </>
    )
}

export default Cart
