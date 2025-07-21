import React, { useEffect } from "react";
import { Navbar, Nav, Container, Dropdown, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function Header() {
    const email = localStorage.getItem('email');
    const name =localStorage.getItem('name');
    const role = localStorage.getItem('role');
    const userId = localStorage.getItem('userId');
    const navigate = useNavigate();

    useEffect(() => {
        if(role === "manager") {
            navigate('/dashboard');
        }
    }, [role]);

    const logout = () => {
        localStorage.clear();
        navigate('/');
    };

    const login = () => {
        navigate('/login');
    };

    return (
        <header>
            <Navbar expand="lg" className="bg-body-tertiary py-3 border-bottom">
                <Container>
                    <Navbar.Brand href="/" className="
                    d-flex align-items-center text-dark text-decoration
                    ">
                        <img src="https://png.pngtree.com/element_our/20190603/ourlarge/pngtree-movie-board-icon-image_1455346.jpg" alt="Logo" width="50" height="50" className="d-inline-block align-text-top" />
                        {' '}
                        <span className="fs-4 
                        ms-2 fw-bold
                        ">Cinema</span>
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link href="/">Home</Nav.Link>
                            {
                              role === "manager" ? (
                                <Nav.Link href="/dashboard">Dashboard</Nav.Link>
                              ) : (
                                <Nav.Link href={`/your-booking/${userId}`}>Your Booking</Nav.Link>
                              )
                            }
                        </Nav>
                        {email ? (
                            <Dropdown align="end">
                                <Dropdown.Toggle variant="link" id="dropdown-user" className="d-block link-dark text-decoration-none">
                                    <img 
                                        src="https://github.com/mdo.png" 
                                        alt="User Avatar" 
                                        width="32" 
                                        height="32" 
                                        className="rounded-circle" 
                                    />
                                </Dropdown.Toggle>
                                <Dropdown.Menu className="text-small shadow" aria-labelledby="dropdown-user">
                                    <Dropdown.Item disabled>{name}</Dropdown.Item> 
                                    <Dropdown.Item href="#">{email}</Dropdown.Item>
                                    <Dropdown.Divider />
                                    <Dropdown.Item onClick={logout}>Sign out</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        ) : (
                            <Button onClick={login}>Login</Button>
                        )}
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    );
}
