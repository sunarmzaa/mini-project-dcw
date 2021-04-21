import Link from 'next/link'
import { Navbar, Nav, Form } from 'react-bootstrap'
import { MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBMask, MDBView, MDBIcon, MDBInput, MDBBtn } from "mdbreact";


const NavBar = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
            <div className="container">
                <a className="navbar-brand" href="/">จะเอ๋ 20</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarResponsive">
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item active">
                            <Link href="/">
                                <a className="nav-link">Home
              <span className="sr-only">(current)</span>
                                </a>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link href="/register">
                                <a className="nav-link" href="#">Register</a>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link href="/login">
                                <a className="nav-link">Login</a>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link href="/profile">
                                <a className="nav-link">Profile</a>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link href="/test">
                                <a className="nav-link">Products</a>
                            </Link>
                            
                        </li>
                        <li className="nav-item">
                            <Link href="/admin">
                                <a className="nav-link">Admin</a>
                            </Link>
                        </li>

                        <li className="nav-item">
                            <Link href="/contact">
                                <a className="nav-link">Contact</a>
                            </Link>
                        </li>
                        <li className="nav-item red-text font-weight-bold" >
                            <Link href="/a">
                                <a className="nav-link">Reviews</a>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link href="/logout">
                                <MDBBtn rounded color="danger" >logout</MDBBtn>
                            </Link>

                        </li>

                    </ul>
                </div>
            </div>
            <style jsx>{`
                .navbar-brand {
                    color: red;
                }     
            `}</style>

        </nav>);
}

export default NavBar;


/*
import Link from 'next/link'
import styles from '../styles/Home.module.css'

const Navbar = () => (

        <div className={styles.nav}>
            <ul>
                <li><Link href="/"><a> Home </a></Link> </li>
                <li><Link href="/register"><a> Register </a></Link></li>
                <li><Link href="/login"><a> Login </a></Link> </li>
                <li><Link href="/profile"><a> Profile </a></Link> </li>
                <li><Link href="/students"><a> Sudents </a></Link> </li>
                <li><Link href="/admin"><a> Admin </a></Link> </li>
                <li><Link href="/logout"><a> Logout </a></Link> </li>
            </ul>
        </div>
)

export default Navbar
*/
