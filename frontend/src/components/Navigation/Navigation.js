import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Navbar, Container, NavDropdown, Nav, Form, Button } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart, faSearch, faUser } from '@fortawesome/free-solid-svg-icons'

import { getCopy, getLanguage } from '../../store/localizationSlice'
import { fetchCopyThunk } from '../../store/localizationThunks'
import { searchProductsThunk } from '../../store/productThunks'

import './Navigation.css'

const Navigation = () => {
    const dispatch = useDispatch()
    const language = useSelector(getLanguage)
    const copy = useSelector(getCopy)

    const [q, setQ] = useState('')

    return (
        <>
            <Navbar expand='lg' bg='dark' variant='dark' fixed='top'>
                <Container>
                    <Navbar.Toggle aria-controls='basic-navbar-nav' />
                    <Navbar.Collapse id='basic-navbar-nav'>
                    <Nav className='me-auto'>
                        <Link to='/'>
                            <img src='/assets/logo-name.png' alt='logo-name'></img>
                        </Link>
                    </Nav>
                    <Nav className='mx-auto'>
                        {/* <Form className='d-flex' onSubmit={dispatch(searchProductsThunk(q))}>
                            <Form.Control type='text' placeholder={copy.search} onChange={(e) => setQ(e.target.value)} />
                            <Button variant='dark' type='submit'>
                                <FontAwesomeIcon icon={faSearch} />
                            </Button>
                        </Form> */}
                    </Nav>
                    <Nav className='ms-auto'>
                        <NavDropdown title={<img src={`/assets/${language}-icon.png`} alt=''></img>} id='language'>
                            <NavDropdown.Item onClick={() => dispatch(fetchCopyThunk('en'))}>English</NavDropdown.Item>
                            <NavDropdown.Item onClick={() => dispatch(fetchCopyThunk('pt'))}>Português</NavDropdown.Item>
                        </NavDropdown>
                        <Link to='/cart' id='cart'>
                            <FontAwesomeIcon icon={faShoppingCart} size='lg' />
                        </Link>
                        <NavDropdown title={<FontAwesomeIcon icon={faUser} size='lg' />} id='account' align='end'>
                            <NavDropdown.Item>{copy.sign_out}</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    )
}

export default Navigation
