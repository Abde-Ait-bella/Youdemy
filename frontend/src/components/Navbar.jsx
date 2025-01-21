import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar as BootstrapNavbar, Nav, Container } from 'react-bootstrap';

const Navbar = ({ isAdmin, isAuthenticated }) => {
  return (
    <BootstrapNavbar bg="dark" variant="dark" expand="lg">
      <Container>
        <BootstrapNavbar.Brand as={Link} to="/courses">
          Youdemy
        </BootstrapNavbar.Brand>
        <BootstrapNavbar.Toggle aria-controls="basic-navbar-nav" />
        <BootstrapNavbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {isAuthenticated && (
              <>
                <Nav.Link as={Link} to="/courses">
                  Courses
                </Nav.Link>
                {isAdmin && (
                  <>
                    <Nav.Link as={Link} to="/categories">
                      Categories
                    </Nav.Link>
                    <Nav.Link as={Link} to="/tags">
                      Tags
                    </Nav.Link>
                    <Nav.Link as={Link} to="/users">
                      Users
                    </Nav.Link>
                  </>
                )}
              </>
            )}
          </Nav>
          <Nav>
            {isAuthenticated ? (
              <Nav.Link
                onClick={() => {
                  sessionStorage.removeItem('user');
                  window.location.href = '/login';
                }}
              >
                Logout
              </Nav.Link>
            ) : (
              <Nav.Link as={Link} to="/login">
                Login
              </Nav.Link>
            )}
          </Nav>
        </BootstrapNavbar.Collapse>
      </Container>
    </BootstrapNavbar>
  );
};

export default Navbar;
