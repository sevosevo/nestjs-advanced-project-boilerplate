import React from 'react';
import Login from '../authentication/Login';
import Register from '../authentication/Register';

export const MainNav = () => (
    <nav className="navbar navbar-expand-sm navbar-light bg-light">
        <div className="container">
            <a className="navbar-brand d-flex align-items-center" href="/">
                <i className="fa fa-instagram mr-2 pt-1"></i>
                |
                <p className="m-0 ml-2">Tal<span style={{ fontWeight: 700 }}>ky</span></p>
            </a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <i className="fa fa-plus-square"></i>
            </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav pt-1 mx-auto">
                    <li className="nav-item">
                        <button type="button" className="btn" data-toggle="modal" data-target="#register">
                            Register
                        </button>
                        <Register />
                    </li>
                    <li className="nav-item">
                        <button type="button" className="btn" data-toggle="modal" data-target="#login">
                            Login
                        </button>
                        <Login />
                    </li>
                </ul>
                <ul className="navbar-nav">
                    <li className="nav-item dropdown">
                        <button className="dropdown-toggle btn" id="navbarDropdown" data-toggle="dropdown">
                            Profile
                        </button>
                        <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                            <a className="dropdown-item" href="/">Create post</a>
                            <a className="dropdown-item" href="/">Upate profile</a>
                            <div className="dropdown-divider"></div>
                            <a className="dropdown-item" href="/">Logout</a>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
)

export default MainNav;