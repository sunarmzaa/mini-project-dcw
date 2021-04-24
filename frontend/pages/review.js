import React, { useState, useEffect } from "react";
import { storage } from "../firebase/firebase";
import styles from "../styles/review.module.css";
import { Spring, animated } from 'react-spring'


function App() {
  const [file, setFile] = useState(null);
  const [img, setImg] = useState([]);
  const [description, setDescription] = useState("");

  useEffect(() => {
    getImageFirebase();
  }, [file]);
  function handleChange(e) {
    setFile(e.target.files[0]);
  }

  function handleUpload(e) {
    e.preventDefault();
    const uploadTask = storage.ref(`/images/${file.name}`).put(file);
    uploadTask.on("state_changed", console.log, console.error, () => {
      storage
        .ref("images")
        .child(file.name)
        .getDownloadURL()
        .then(() => {
          setFile(null);
        });
    });
  }

  const getImageFirebase = async () => {
    const storageFirebase = storage.ref();
    storageFirebase
      .child("/images")
      .listAll()
      .then(async (res) => {
        return await res.items.map((nameImg) => {
          return storageFirebase
            .child(`/images/${nameImg.name}`)
            .getDownloadURL()
            .then((url) => {
              return { url, name: nameImg.name };
            });
        });
      })
      .then((res) => {
        Promise.all(res).then((values) => {
          setImg(values);
        });
      });
  };
  return (
    <div>
      <div className={styles.con}>
      <br></br>
      <br></br>
      <div className={styles.head}>
      <div className={styles.welcome}>

<Spring
        loop
        from={{ opacity: 0, color: 'red' }}
        to={[
            { opacity: 1, color: '#ffaaee' },
            { opacity: 0, color: 'rgb(14,26,19)' },
        ]}>
        {styles => (
            <animated.div style={styles}>รีวิวสินค้าร้าน "จะเอ๋ 20</animated.div>
        )}
    </Spring>
    </div>        
      </div>
      <div className={styles.head}></div>
      <form onSubmit={handleUpload}>
      <div className={styles.head}>
        <input type="file" onChange={handleChange} />
        <button disabled={!file}>upload to firebase</button>
      </div>
      </form>
      <br></br>
      <br></br>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {img.length > 0
          ? img.map((ImgUrl, index) => {
              return (
                <div className={styles.review}>   
                ชื่อรูป<div key={index}>
                  <p style={{ textAlign: "center" }}>
                    {ImgUrl.name.slice(0, ImgUrl.name.length - 4)}
                  </p>
                  <img
                    src={ImgUrl.url}
                    alt=""
                    style={{ width: "150px", height: "150px" }}
                  />
                </div>
</div>
              );
            })
          : "No image"}
      </div>
      </div>
    </div>
  );
}
export default App;
