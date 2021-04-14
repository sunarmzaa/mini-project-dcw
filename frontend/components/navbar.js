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

/*
 <Link href="/"><a> Home </a></Link>
        <Link href="/register"><a> Register </a></Link>
        <Link href="/login"><a> Login </a></Link>
        <Link href="/profile"><a> Profile </a></Link>
        <Link href="/foo"><a> Foo </a></Link>
        <Link href="/students"><a> Sudents </a></Link>
        <Link href="/admin"><a> Admin </a></Link>
        <Link href="/getConfig"><a> Config </a></Link>
        <Link href="/logout"><a> Logout </a></Link>
        */