import useSWR, { mutate } from "swr";
import axios from "axios";
import React, { useState, useEffect } from "react";
//import styles from "../styles/Home.module.css";
import styles from "../styles/Index.module.css";
import Link from 'next/link'
import Navbar from "../components/navbar";
const URL = "http://localhost/api/students";
const URL_BUY = "http://localhost/api/purchase";
const fetcher = (key) => fetch(key).then((res) => res.json());
const index = () => {
  const { data, error } = useSWR(URL, fetcher, { revalidateOnFocus: false });
  if (error) return <div>failed to load</div>;
  if (!data) return <div>Loading...</div>;
  console.log("data", data);

  /*
  const buyStudent = async (id) => {
    let result = await axios.post(`${URL_BUY}/${id}`)
    mutate(URL, data);
  }
*/
  const showStudents = () => {
    if (data.list && data.list.length) {
      return data.list.map((item, index) => {
        return (
          <div className={styles.listItem} key={index}>
            <div><b>Name :</b> {item.name}</div>
            <div><b>Surname :</b> {item.surname}</div>
            <div><b>Major :</b> {item.major} </div>
            <div><b>Gpa :</b> {item.gpa}</div>
            {/* <div><b>Image :</b> {item.imageUrl}</div> */}
            <div><b>Image :</b> <img src={item.imageUrl}/></div>


            
          </div>
        );
      });
    } else {
      return <p>Loading...</p>;
    }
  };
  return (
    <div className={styles.stcontainer}><Navbar />
      <div className={styles.sttitle}>
        Students</div>
      <div className={styles.stlist}>
        {showStudents()}
      </div>

    </div>
  );
};
export default index;
