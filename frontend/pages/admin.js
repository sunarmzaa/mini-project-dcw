import axios from "axios";
import React, { useState, useEffect } from "react";
import styles from "../styles/Student.module.css";
import Link from "next/link";
import withAuth from "../components/withAuth";
import Navbar from "../components/navbar";
import index from "./test";
const URL = "http://localhost/api/students";

const URL_IN = "http://localhost/api/income";
//C:\Users\Admin\Desktop\Mini Project in DCW\frontend\image\add_image.png
const emptyImageUrl = '/image/add_image.png';

const admin = ({ token }) => {
  const [user, setUser] = useState({});
  const [students, setStudents] = useState({});
  const [income, setIncome] = useState();
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [major, setMajor] = useState("");
  const [gpa, setGpa] = useState();

  ////////////////
  const [imageUrl, setImageUrl] = useState(emptyImageUrl);

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


  const [student, setStudent] = useState({});
  useEffect(() => {
    setImageUrl();
    getStudents();
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
  const getStudentById = async (id) => {
    let result = await axios.get(`${URL}/${id}`);
    console.log(result.data);
    setStudent(result.data);
  };
  /*
    const getIncome = async () => {
      let result = await axios.get(URL_IN);
      setIncome(result.data);
    };
  */
  const getStudents = async () => {
    let result = await axios.get(URL);
    setStudents(result.data.list);
  };

  const addStudent = async () => {
    let result = await axios.post(URL, {
      name,
      surname,
      major,
      gpa,
      imageUrl
    });
    console.log(result);
    getStudents();
  };

  const deleteStudent = async (id) => {
    let result = await axios.delete(`${URL}/${id}`);
    getStudents();
  };

  const updateStudent = async (id) => {
    let result = await axios.put(`${URL}/${id}`, {
      name,
      surname,
      major,
      gpa,
      imageUrl
    });
    console.log(result);
    getStudents();
  };


  const showStudents = () => {
    if (students && students.length) {
      return students.map((item, index) => {
        return (
          <div className={styles.listItem} key={index}>
            <div><b>Name :</b> {item.name} <br /></div>
            <div><b>Surname :</b> {item.surname} <br /></div>
            <div><b>Major :</b> {item.major} <br /></div>
            <div><b>Gpa :</b> {item.gpa}</div>
            <div><b>Image :</b> {item.imageUrl}</div>
            <div className={styles.edit_button}>
              <button
                className={styles.button_get}
                onClick={() => getStudentById(item.id)}>
                Get
              </button>

              <button
                className={styles.button_update}
                onClick={() => updateStudent(item.id)}>
                Update
              </button>

              <button
                className={styles.button_delete}
                onClick={() => deleteStudent(item.id)}>
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
  return (
    <div className={styles.container}>
      <Navbar />
      <h1>Student</h1>
      <div className={styles.form_add}>
        <h2>Add Students</h2>
        Name :
        <input
          type="text"
          name="name"
          onChange={(e) => setName(e.target.value)}
        ></input>

        Surname :
        <input
          type="text"
          name="surname"
          onChange={(e) => setSurname(e.target.value)}
        ></input>

        Major :
        <input
          type="text"
          name="major"
          onChange={(e) => setMajor(e.target.value)}
        ></input>

        Gpa :
        <input
          type="number"
          name="gpa"
          onChange={(e) => setGpa(e.target.value)}
        ></input>

        Image:
        <label className='form-control'>
          <img className='image' src={imageUrl} />
          <input className='input-file' type='file' onChange={handleChangeImage} />
        </label>  

    
        <button
          className={styles.button_add}
          onClick={() => addStudent(name, surname, major, gpa, imageUrl)}
        >
          Add
        </button>
      </div>



      <div className={styles.list}>{showStudents()}</div>
    </div>
  );
};
export default withAuth(admin);

export function getServerSideProps({ req, res }) {
  return { props: { token: req.cookies.token || "" } };
}
