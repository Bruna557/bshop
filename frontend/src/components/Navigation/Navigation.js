import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { Navbar, Container, NavDropdown, Nav, Form, Button } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart, faSearch, faUser, faSignIn } from '@fortawesome/free-solid-svg-icons'

import { logout } from '../../services/userService'
import { getIsLoggedIn, setIsLoggedIn } from '../../store/userSlice'
import { getCopy, getLanguage } from '../../store/localizationSlice'
import { fetchCopyThunk } from '../../store/localizationThunks'

import './Navigation.css'

const Navigation = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const language = useSelector(getLanguage)
    const copy = useSelector(getCopy)
    const isLoggedIn = useSelector(getIsLoggedIn)
    const [q, setQ] = useState('')

    const search = (e) => {
        e.preventDefault()
        const path = `/search?q=${q}`
        setQ('')
        navigate(path)
    }

    const signOut = () => {
        logout()
        dispatch(setIsLoggedIn(false))
    }

    return (
        <>
            <Navbar collapseOnSelect expand='md' bg='dark' variant='dark' fixed='top'>
                <Container>
                    <Navbar.Brand>
                        <Link to='/'>
                            <img src='/assets/logo-name.png' alt='logo-name'></img>
                        </Link>
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls='responsive-navbar-nav' />
                    <Navbar.Collapse id='responsive-navbar-nav'>
                        <Nav className='mx-auto'>
                            <Form className='d-flex ptb5' onSubmit={search}>
                                <Form.Control
                                    type='text'
                                    placeholder={copy.search}
                                    value={q}
                                    onChange={(event) => setQ(event.target.value)} />
                                <Button variant='dark' type='submit'>
                                    <FontAwesomeIcon icon={faSearch} />
                                </Button>
                            </Form>
                        </Nav>
                        <Nav>
                            <NavDropdown title={<img src={`/assets/${language}-icon.png`} alt=''></img>} id='language'>
                                <NavDropdown.Item onClick={() => dispatch(fetchCopyThunk('en'))}>English</NavDropdown.Item>
                                <NavDropdown.Item onClick={() => dispatch(fetchCopyThunk('pt'))}>Português</NavDropdown.Item>
                            </NavDropdown>
                            <Link to='/cart' id='cart'>
                                <FontAwesomeIcon icon={faShoppingCart} size='lg' />
                            </Link>
                            {isLoggedIn &&
                                <NavDropdown title={<FontAwesomeIcon icon={faUser} size='lg' />} id='account' align='end'>
                                    <NavDropdown.Item onClick={signOut}>{copy.sign_out}</NavDropdown.Item>
                                </NavDropdown>}
                            {!isLoggedIn &&
                                <Link to='/login' id='login'>
                                    <FontAwesomeIcon icon={faSignIn} size='lg' id='login-icon' />
                                </Link>}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    )
}

export default Navigation
