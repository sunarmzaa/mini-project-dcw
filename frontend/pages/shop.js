import useSWR, { mutate } from "swr";
import axios from "axios";
import React, { useState, useEffect } from "react";
//import styles from "../styles/Home.module.css";
import styles from "../styles/shop.module.css";
import Link from 'next/link'
import Navbar from "../components/navbar";
const URL = "http://localhost/api/shops";
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
  //medicine
  //name  description price quantity  imageUrl 
  const showShops = () => {
    if (data.list && data.list.length) {
      return data.list.map((item, index) => {
        return (
          <div className={styles.listItem} key={index}>
            <div className={styles.listItem1} key={index}>
              <div><b>ชื่อ :</b> {item.name}</div>
              <div><b>รายละเอียด :</b> {item.description}</div>
              <div><b>ราคา :</b> {item.price} บาท/ชิ้น</div>
              <div><b>มีอยู่จำนวน :</b> {item.quantity} ชิ้น</div>
            </div>
            {/* <div><b>Image :</b> {item.imageUrl}</div> */}
            <div><img src={item.imageUrl} style={{ width: "150px", height: "150px" }} /></div>

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
        สินค้า</div>
      <div className={styles.stlist}>
        {showShops()}
      </div>

    </div>
  );
};
export default index;
