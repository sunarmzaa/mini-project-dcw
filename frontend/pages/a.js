import React, { useState, useEffect } from "react";
import { storage } from "../firebase/firebase";
import styles from "../styles/b.module.css";

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
      <div className={styles.head}>
        <h1>รีวิวสินค้า</h1>
      </div>
      <div className={styles.head}>
      <form onSubmit={handleUpload}>
        <input type="file" onChange={handleChange} />
      </form>
      <br></br>
      รีวิวสินค้า    
        <input
          type="text"
          name="description"
          onChange={(e) => setDescription(e.target.value)}
        ></input>
        <br></br>
        <br></br>
        <br></br>
        <button disabled={!file}>upload to firebase</button>
      </div>
    
      <br></br>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {img.length > 0
          ? img.map((ImgUrl, index) => {
            return (
              <div key={index}>
                <p style={{ textAlign: "center" }}>
                  {ImgUrl.name.slice(0, ImgUrl.name.length - 4)}
                </p>
                <img
                  src={ImgUrl.url}
                  alt=""
                  style={{ width: "150px", height: "150px" }}
                />
                <div><b>รีวิวสินค้า :</b> {item.description}</div>
              </div>
              
            );
          })
          : "No image"}
      </div>
    </div>
  );
}
export default App;
