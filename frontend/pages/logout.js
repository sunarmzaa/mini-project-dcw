import Head from 'next/head'
import Layout from '../components/layout'
import Navbar from '../components/navbar'
import { useEffect, useState } from 'react'
import styles from '../styles/Home.module.css'
import axios from 'axios'
import config from '../config/config'

export default function Logout({ token }) {

    const [status, setStatus] = useState('')

    useEffect(() => {
        logout()
    }, [])

    const logout = async () => {
        console.log('remove token: ', token)
        let result = await axios.get(`${config.URL}/logout`, { withCredentials: true })
        setStatus("Logout successful")
    }

    return (
        <Layout>
            <Head>
                <title>User profile</title>
            </Head>
            <div className={styles.container}>
                <Navbar />
                <br></br>
                <br></br>
                <br></br>

                <h1>Logout</h1>
                <div>
                <div className={styles.sta}>
                <h2> {status}  </h2> 
                </div>               
                    <img src="https://i.pinimg.com/originals/d0/57/d0/d057d0157678a6664132e880f117b813.gif" className="img-fluid z-depth-1" /><a href="/login"></a>

                </div>
            </div>
        </Layout>
    )
}
