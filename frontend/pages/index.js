import Head from 'next/head' 
import Layout from '../components/layout' 
import Navbar from '../components/navbar'
import styles from '../styles/Home.module.css'
import { MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBMask, MDBView ,MDBIcon , MDBInput ,MDBBtn } from "mdbreact";


export default function Home({ token }) {
 
  return (
    <Layout>
    <Head>
        <title>First Page</title>
    </Head>
    <div className={styles.container}>
        <Navbar />
        <div>
        
        <section className="my-5">
          <h2 className="h1-responsive font-weight-bold text-center my-5">
            ยินดีต้องรับเข้าสู่ "คุณหมอ"
        </h2>
          <p className="grey-text w-responsive text-center mx-auto mb-5">
            เว็บไซต์นี้จัดทำขึ้นเพื่อ การจัดเก็บยา
        </p>
        </section>


        <MDBContainer>
          <MDBRow>
            <MDBCol md="12" className="mb-3">
              <img src="https://www.tcijthai.com/office-tcij/headpicture/20803a11a27965f6cc4e8dcb554ceff9.jpg" className="img-fluid z-depth-1" alt="" />
            </MDBCol>
          </MDBRow>
          {/* <MDBRow>
            <MDBCol lg="4" md="12" className="mb-3">
              <img src="http://www.papamenu.com/wp-content/uploads/2017/05/%E0%B8%82%E0%B9%88%E0%B8%B2.jpg" className="img-fluid z-depth-1" alt="" />
            </MDBCol>
            <MDBCol lg="4" md="6" className="mb-3">
              <img src="https://www.samunpri.com/kitchendrugs/wp-content/uploads/2017/09/%E0%B8%82%E0%B9%88%E0%B8%B2.jpg" className="img-fluid z-depth-1" alt="" />
            </MDBCol>
            <MDBCol lg="4" md="6" className="mb-3">
              <img src="https://storage.thaipost.net/main/uploads/photos/big/20200707/image_big_5f045d1e22127.jpg" className="img-fluid z-depth-1" alt="" />
            </MDBCol>
          </MDBRow>
          <MDBRow>
            <MDBCol md="6" className="mb-3">
              <img src="https://www.thaihealth.or.th/data/content/2015/05/28248/cms/thaihealth_c_dfhjnruv1569.jpg" className="img-fluid z-depth-1" alt="" />
            </MDBCol>
            <MDBCol md="6" className="mb-3">
              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTH9e2YpNrC18iWqZrx61pqpSvSyo7GzU4W3ai9znpwU8_OBskYEUcA9EM-QSyc1-7-wWs&usqp=CAU" className="img-fluid z-depth-1" alt="" />
            </MDBCol>
          </MDBRow> */}
        </MDBContainer>
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



/*
import Head from 'next/head' 
import Layout from '../components/layout' 
import Navbar from '../components/navbar'
import styles from '../styles/Home.module.css'
import { MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBMask, MDBView } from "mdbreact";


export default function Home({ token }) {
 
  return (
    <Layout>
    <Head>
        <title>First Page</title>
    </Head>
    <div className={styles.container}>
        <Navbar />
        <div>
        <section className="my-5">
          <h2 className="h1-responsive font-weight-bold text-center my-5">
            ยินดีต้องรับเข้าสู่ "ไปเที่ยวกาน"
        </h2>
          <p className="grey-text w-responsive text-center mx-auto mb-5">
            เว็บไซต์นี้จัดทำขึ้นเพื่อ แนะนำสถานที่ท่องเที่ยวภายในประเทศไทย แลกเปลี่ยนการท่องเที่ยวของกันและกัน และเพื่อสนับสนุนการท่องเที่ยวภายในประเทศ
            โดยผู้ใช้สามารถเข้ามาแชร์ประสบการณ์การการท่องเที่ยวของท่านให้ผู้อื่นได้รับรู้ได้ในเว็บไซต์นี้
        </p>
        </section>
        
        <MDBContainer>
          <MDBRow>
            <MDBCol md="12" className="mb-3">
              <img src="https://kasikornresearch.com/SiteCollectionDocuments/analysis/business/tourism/Th2Th_Banner.jpg" className="img-fluid z-depth-1" alt="" />
            </MDBCol>
          </MDBRow>
          <MDBRow>
            <MDBCol lg="4" md="12" className="mb-3">
              <img src="https://ed.edtfiles-media.com/ud/news/1/140/419059/500rai_Cover-850x567.jpg" className="img-fluid z-depth-1" alt="" />
            </MDBCol>
            <MDBCol lg="4" md="6" className="mb-3">
              <img src="https://images.thaiza.com/37/37_20121226133538..jpg" className="img-fluid z-depth-1" alt="" />
            </MDBCol>
            <MDBCol lg="4" md="6" className="mb-3">
              <img src="https://teawtalay.com/wp-content/uploads/4island-2.jpg" className="img-fluid z-depth-1" alt="" />
            </MDBCol>
          </MDBRow>
          <MDBRow>
            <MDBCol md="6" className="mb-3">
              <img src="https://2.bp.blogspot.com/-V-XMM40IX9g/V4hz_ip9hhI/AAAAAAAASLc/Mbe2y4hIY8gtTYAM2Px86WF4Im63XyrrQCK4B/s1600/CHOUI%2BFONG%2BTEA3.jpg" className="img-fluid z-depth-1" alt="" />
            </MDBCol>
            <MDBCol md="6" className="mb-3">
              <img src="https://f.ptcdn.info/996/051/000/orxnw0fsc51nGF38fR1-o.jpg" className="img-fluid z-depth-1" alt="" />
            </MDBCol>
          </MDBRow>
        </MDBContainer>
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
*/