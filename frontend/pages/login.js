import Head from "next/head";
import Layout from "../components/layout";
import { useState } from "react";
import Navbar from "../components/navbar";
import styles from "../styles/Home.module.css";
import axios from "axios";
import config from "../config/config";

export default function Login({ token }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("");
  const [remember, setRemember] = useState(false);
  const login = async (req, res) => {
    try {
      let result = await axios.post(
        `${config.URL}/login`,
        { username, password, remember },
        { withCredentials: true }
      );
      console.log("result: ", result);
      console.log("result.data:  ", result.data);
      console.log("token:  ", token);
      setStatus(result.status + ": " + result.data.user.username);
    } catch (e) {
      console.log("error: ", JSON.stringify(e.response));
      setStatus(JSON.stringify(e.response).substring(0, 80) + "...");
    }
  };
  const reMem = async () => {
    setRemember(!remember);
  };

  const loginForm = () => (
    <div className={styles.gridContainer}>
      <div>Username:</div>
      <div>
        <input
          type="text"
          name="username"
          placeholder="username"
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div>Password:</div>
      <div>
        <input
          type="password"
          name="password"
          placeholder="password"
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>


      <div>Confirm Password:</div>
      <div>
        <input
          type="password"
          name="password"
          placeholder="password"
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <div className="flex items-center">
        <input
          id="remember_me"
          name="remember_me"
          type="checkbox"
          onClick={reMem}
        />
        <label>Remember me</label>
      </div>

    </div>







  );

  const copyText = () => {
    navigator.clipboard.writeText(token);
  };

  return (
    <Layout>
      <Head>
        <title>Login</title>
      </Head>
      <div className={styles.locontainer}>
      <div className={styles.lo1container}>
        <Navbar />
        <div className={styles.gif}>
        <img src="https://c.tenor.com/W-Q9RgnuDQgAAAAj/supermarket-mart.gif" className="img-fluid z-depth-1" /><a href="/login"></a>
        </div><div className={styles.lo}>
          <h1>Login</h1>
          </div>
        {/* <div>
          <b>Token:</b> {token.substring(0, 15)}...
          <button onClick={copyText}> Copy token </button>
        </div>
        <br /> */}
        <div>Status: {status}</div>
        {/* <br /> */}
        {loginForm()}
        <div>
        <div className={styles.button}>
          <button onClick={login}>Login</button></div>
          <a className="nav-link" href="/register">Register here</a>
        </div>

        {/* <div>
          <h1 className="h1-responsive font-weight-bold" >WELCOME</h1>
          <hr className="hr-light" />
          
        </div> */}
      </div>
      </div>
    </Layout>
  );
}

export function getServerSideProps({ req, res }) {
  return { props: { token: req.cookies.token || "" } };
}
