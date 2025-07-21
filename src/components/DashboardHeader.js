import React, { useEffect, useState } from "react";
import { Navbar, Nav, Container, Dropdown, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function Header() {
    const [email, setEmail] = useState('');
    const [role, setRole] = useState('');
    const [userId, setUserId] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        // Kiểm tra session khi component mount
        const checkSession = () => {
            const sessionId = sessionStorage.getItem('sessionId');
            
            if (!sessionId) {
                // Nếu không có session (browser đã tắt), clear localStorage
                localStorage.clear();
                navigate('/login');
                return;
            }

            // Lấy thông tin user từ localStorage
            const userEmail = localStorage.getItem('email');
            const userRole = localStorage.getItem('role');
            const userIdFromStorage = localStorage.getItem('userId');

            if (!userEmail || !userRole || !userIdFromStorage) {
                // Nếu thiếu thông tin, redirect về login
                navigate('/login');
                return;
            }

            setEmail(userEmail);
            setRole(userRole);
            setUserId(userIdFromStorage);

            // Kiểm tra quyền truy cập
            if (userRole !== "manager" && window.location.pathname.includes('/dashboard')) {
                navigate('/');
            }
        };

        checkSession();
    }, [navigate]);

    const logout = () => {
        localStorage.clear();
        sessionStorage.clear();
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
                                <>
                                    <Nav.Link href="/dashboard">Movies</Nav.Link>
                                    <Nav.Link href="/dashboard/users">Users</Nav.Link>
                                    <Nav.Link href="/dashboard/booking">Bookings</Nav.Link>
                                </>
                              ) : (
                                <Nav.Link href={`/your-booking/${userId}`}>Your Booking</Nav.Link>
                              )
                            }
                        </Nav>
                        {email ? (
                            <Dropdown align="end">
                                <Dropdown.Toggle variant="link" id="dropdown-user" className="d-block link-dark text-decoration-none">
                                    <img src="https://github.com/mdo.png" alt="mdo" width="32" height="32" className="rounded-circle" />
                                </Dropdown.Toggle>
                                <Dropdown.Menu className="text-small shadow" aria-labelledby="dropdown-user">
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