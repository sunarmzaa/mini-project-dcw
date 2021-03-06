import axios from "axios";
import React, { useState, useEffect } from "react";
import styles from "../styles/addmin.module.css";
import Link from "next/link";
import withAuth from "../components/withAuth";
import Navbar from "../components/navbar";
const URL = "http://localhost/api/shops";
import { Spring, animated } from 'react-spring'

const URL_IN = "http://localhost/api/income";
//C:\Users\Admin\Desktop\Mini Project in DCW\frontend\image\add_image.png
// const emptyImageUrl = '/image/add_image.png';

const admin = ({ token }) => {
  const [user, setUser] = useState({});
  const [shops, setShops] = useState({});
  const [income, setIncome] = useState();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState();
  const [quantity, setQuantity] = useState();

  //////////////////name  description price quantity  imageUrl 
  const [imageUrl, setImageUrl] = useState();
  
  const handleChangeImage = e => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      setImageUrl(e.target.result)
    }

    if (file)
      reader.readAsDataURL(file);
  }


  ///////////////


  const [shop, setShop] = useState({});
  useEffect(() => {
    setImageUrl();
    getShops();
    /*    getIncome();  */
    profileUser();




  }, []);
  const profileUser = async () => {
    try {
      // console.log('token: ', token)
      const users = await axios.get(`${config.URL}/profile`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      // console.log('user: ', users.data)
      setUser(users.data);
    } catch (e) {
      console.log(e);
    }
  };
  const getShopById = async (id) => {
    let result = await axios.get(`${URL}/${id}`);
    console.log(result.data);
    setShop(result.data);
  };
  /*
    const getIncome = async () => {
      let result = await axios.get(URL_IN);
      setIncome(result.data);
    };
  */
  const getShops = async () => {
    let result = await axios.get(URL);
    setShops(result.data.list);
  };
// name  description price quantity  imageUrl 
  const addShop = async () => {
    let result = await axios.post(URL, {
      name,
      description,
      price,
      quantity,                
      imageUrl,
    });
    console.log(result);
    getShops();
  };

  const deleteShop = async (id) => {
    let result = await axios.delete(`${URL}/${id}`);
    getShops();
  };

  const updateShop = async (id) => {
    let result = await axios.put(`${URL}/${id}`, {
      name,
      description,
      price,
      quantity,                
      imageUrl,
    });
    console.log(result);
    getShops();
  };

// name  description price quantity  imageUrl 
  const showShops = () => {
    if (shops && shops.length) {
      return shops.map((item, index) => {
        return (
          <div className={styles.listItem} key={index}>
            <div className={styles.listItem1} key={index}>
            <div><b>???????????? :</b> {item.name} <br /></div>
            <div><b>?????????????????????????????? :</b> {item.description} <br /></div>
            <div><b>???????????? :</b> {item.price} ?????????<br /></div>
            <div><b>????????????????????????????????? :</b> {item.quantity} ????????????</div>
            {/* <div><b>Image :</b> {item.imageUrl}</div> */}
            {/* <div><b>Image :</b> <img src={item.imageUrl }/></div> */}
            </div>
            <div><img src={item.imageUrl } style={{ width: "150px", height: "150px" }} /></div>

            <div className={styles.edit_button}>
              <button
                className={styles.button_get}
                onClick={() => getShopById(item.id)}>
                Get
              </button>

              <button
                className={styles.button_update}
                onClick={() => updateShop(item.id)}>
                Update
              </button>

              <button
                className={styles.button_delete}
                onClick={() => deleteShop(item.id)}>
                Delete
              </button>

            </div>
          </div>
        );
      });
    } else {
      return <p>Loading...</p>;
    }
  };
  // console.log(imageUrl);
  return (
    <div className={styles.container}>
      <Navbar />
      
      <div className={styles.text}>
      <Spring
                loop
                from={{ opacity: 0, color: 'red' }}
                to={[
                    { opacity: 1, color: '#ffaaee' },
                    { opacity: 0, color: 'rgb(14,26,19)' },
                ]}>
                {styles => (
                    <animated.div style={styles}>??????????????????</animated.div>
                )}
            </Spring>

</div>

      <div className={styles.form_add}>
        <h2>Add Products</h2>            
{/* name  description price quantity  imageUrl  */}
        Name (????????????) :
        <input
          type="text"
          name="name"
          onChange={(e) => setName(e.target.value)}
        ></input>

        Description (??????????????????????????????) :
        <input
          type="text"
          name="description"
          onChange={(e) => setDescription(e.target.value)}
        ></input>

        Price (????????????) :
        <input
          type="number"
          name="price"
          onChange={(e) => setPrice(e.target.value)}
        ></input>

        Quantity (?????????????????????????????????) :
        <input
          type="number"
          name="quantity"
          onChange={(e) => setQuantity(e.target.value)}
        ></input>

        Image (??????????????????) :
        <label className='form-control'>
          <img className='image' src={imageUrl} />
          <input className='input-file' type='file' onChange={handleChangeImage} />
        </label>

        <button
          className={styles.button_add}
          onClick={() => addShop(name, description, price, quantity, imageUrl)}
        >
          Add
        </button>
      </div>

      <div className={styles.addlist}>{showShops()}</div>
      
    </div>
  );
};
export default withAuth(admin);

export function getServerSideProps({ req, res }) {
  return { props: { token: req.cookies.token || "" } };
}
