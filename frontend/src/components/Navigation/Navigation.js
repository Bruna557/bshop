import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { Navbar, Container, NavDropdown, Nav, Form, Button } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart, faSearch, faUser } from '@fortawesome/free-solid-svg-icons'

import { getCopy, getLanguage } from '../../store/localizationSlice'
import { fetchCopyThunk } from '../../store/localizationThunks'

import './Navigation.css'

const Navigation = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const language = useSelector(getLanguage)
    const copy = useSelector(getCopy)
    const [q, setQ] = useState('')

    const search = () => {
        const path = `/search?q=${q}`
        setQ('')
        navigate(path)
    }

    return (
        <>
            <Navbar collapseOnSelect expand="md" bg="dark" variant="dark" fixed="top">
                <Container>
                    <Navbar.Brand>
                        <Link to='/'>
                            <img src='/assets/logo-name.png' alt='logo-name'></img>
                        </Link>
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="mx-auto">
                            <Form className='d-flex ptb5'>
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
                        <Nav>
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
