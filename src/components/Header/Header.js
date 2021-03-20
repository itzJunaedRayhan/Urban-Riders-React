import React, { useContext } from 'react';
import { Link, useParams } from 'react-router-dom';
import { userContext } from '../../App';
import brand from '../../images/jk-5.png'
import {Navbar, Nav} from 'react-bootstrap'
import './Header.css'
const Header = () => {
    const {id} = useParams()
    const [loggedInUser, setLoggedInUser] = useContext(userContext)
    const [vehicles, setVehicles] = useContext(userContext)
    return (
        <div className="header">
            <Navbar collapseOnSelect expand="lg" variant="dark">
                <Navbar.Brand className="brand" href="/home"><img src={brand} alt=""/></Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mr-auto"></Nav>
                    <Nav className="items">
                        <Nav.Link><Link to="/home">Home</Link></Nav.Link>
                        <Nav.Link><Link to={`/destination/1`}>Destination</Link></Nav.Link>
                        <Nav.Link><Link to="/home">Blog</Link></Nav.Link>
                        <Nav.Link><Link to="/home">Contact</Link></Nav.Link>
                        <Nav.Link className="login"><Link to="/login">{loggedInUser.displayName || loggedInUser.email || 'Login'}</Link></Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </div>
    );
};
export default Header;