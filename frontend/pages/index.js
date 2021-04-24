import Head from 'next/head' 
import Layout from '../components/layout' 
import Navbar from '../components/navbar'
import styles from '../styles/Home.module.css'
import { MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBMask, MDBView ,MDBIcon , MDBInput ,MDBBtn } from "mdbreact";
import { Spring, animated } from 'react-spring'

export default function Home({ token }) {
 
  return (
    <Layout>
    <Head>
        <title>First Page</title>
    </Head>
    <div className={styles.container}>
        <Navbar />
        <div>
        <div className={styles.welcome}>

        <Spring
                loop
                from={{ opacity: 0, color: 'red' }}
                to={[
                    { opacity: 1, color: '#ffaaee' },
                    { opacity: 0, color: 'rgb(14,26,19)' },
                ]}>
                {styles => (
                    <animated.div style={styles}>ยินดีต้องรับเข้าสู่ร้าน "จะเอ๋ 20</animated.div>
                )}
            </Spring>
            </div>        
            <p className="grey-text w-responsive text-center mx-auto mb-6">
            เว็บไซต์นี้จัดทำขึ้นเพื่อ การสต็อกสินค้าภายในร้านและสำรวจรีวิวสินค้า
        </p>

            <div className={styles.image}>
            <figure>
                <img src="../image/a1.jpg"/>
                <img src="../image/a3.jpg"/>
                <img src="../image/a4.jpg"/>
                <img src="../image/a5.jpg"/>
                <img src="../image/a6.jpg"/>
                <img src="../image/a7.jpg"/>
                <img src="../image/a8.jpg"/>
                <img src="../image/a9.jpg"/>
                <img src="../image/a10.jpg"/>
            </figure>
        </div>
        <div className={styles.in}>
        {/* <button><a href="/login">เข้าสู่เว็บไซต์</a></button> */}
        
        <a href="/login"><img src="https://mkp.thai.ac/client-upload/mkp/welcome_slide/1612189405-unnamed.png" className="img-fluid z-depth-1" alt=""  /></a>

        </div>
        </div>
        <div className={styles.im}>

        <img src="https://img.pikbest.com/58pic/35/44/12/95c58PICegm78BIca1b43_PIC2018.gif!bw700" className="img-fluid z-depth-1" /><a href="/login"></a>
</div>
    </div>
    
</Layout>
  )
}

export function getServerSideProps({ req, res }) {
  // console.log("token from cookie: ",cookie.get("token")) 
  // console.log('req: ', req.headers)
  return { props: { token: req.cookies.token || "" } };
}

