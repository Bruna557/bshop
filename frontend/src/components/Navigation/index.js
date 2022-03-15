import { Navbar, Container, NavDropdown, Nav, Form, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart, faSearch, faUser } from "@fortawesome/free-solid-svg-icons";

import "./style.css";

const Navigation = () => {
    return (
        <>
            <Navbar expand="lg" bg="dark" variant="dark" fixed="top">
                <Container>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="/">
                            <img src="./assets/logo-name.png" alt="logo-name"></img>
                        </Nav.Link>
                    </Nav>
                    <Nav className="mx-auto">
                        <Form className="d-flex">
                            <Form.Control type="text" placeholder="Search" />
                            <Button variant="dark">
                                <FontAwesomeIcon icon={faSearch} />
                            </Button>
                        </Form>
                    </Nav>
                    <Nav className="ms-auto">
                        <NavDropdown title="EN" id="language">
                            <NavDropdown.Item>English</NavDropdown.Item>
                            <NavDropdown.Item>Português</NavDropdown.Item>
                        </NavDropdown>
                        <Nav.Link href="/cart">
                            <FontAwesomeIcon icon={faShoppingCart} size="lg" />
                        </Nav.Link>
                        <NavDropdown title={<FontAwesomeIcon icon={faUser} size="lg" />} id="account">
                            <NavDropdown.Item>bruna@gmail.com</NavDropdown.Item>
                            <NavDropdown.Item>Sign out</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    );
}

export default Navigation;
