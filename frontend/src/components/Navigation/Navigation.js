import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { Navbar, Container, NavDropdown, Nav, Form, Button } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart, faSearch, faUser, faSignIn } from '@fortawesome/free-solid-svg-icons'

import { logout } from '../../services/mocks/userService'
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

    const search = () => {
        const path = `/search?q=${q}`
        setQ('')
        navigate(path)
    }

    const signIn = () => {
        navigate('/login')
    }

    const signOut = () => {
        logout()
        dispatch(setIsLoggedIn(false))
    }

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
                        <Form className='d-flex'>
                            <Form.Control
                                type='text'
                                placeholder={copy.search}
                                value={q}
                                onChange={(event) => setQ(event.target.value)} />
                            <Button variant='dark' onClick={search}>
                                <FontAwesomeIcon icon={faSearch} />
                            </Button>
                        </Form>
                    </Nav>
                    <Nav className='ms-auto'>
                        <NavDropdown title={<img src={`/assets/${language}-icon.png`} alt=''></img>} id='language'>
                            <NavDropdown.Item onClick={() => dispatch(fetchCopyThunk('en'))}>English</NavDropdown.Item>
                            <NavDropdown.Item onClick={() => dispatch(fetchCopyThunk('pt'))}>Português</NavDropdown.Item>
                        </NavDropdown>
                        <Link to='/cart' id='cart'>
                            <FontAwesomeIcon icon={faShoppingCart} size='lg' />
                        </Link>
                        {isLoggedIn && <NavDropdown title={<FontAwesomeIcon icon={faUser} size='lg' />} id='account' align='end'>
                            <NavDropdown.Item onClick={signOut}>{copy.sign_out}</NavDropdown.Item>
                        </NavDropdown>}
                        {!isLoggedIn &&
                            <Button variant='dark' onClick={signIn}>
                                {<FontAwesomeIcon icon={faSignIn} size='lg' />}
                            </Button>}
                    </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    )
}

export default Navigation
