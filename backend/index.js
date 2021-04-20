const express = require("express"),
  app = express(),
  passport = require("passport"),
  port = process.env.PORT || 80,
  cors = require("cors"),
  cookie = require("cookie");

const bcrypt = require("bcrypt");

const db = require("./database.js");
let users = db.users;



require("./passport.js");

const router = require("express").Router(),
  jwt = require("jsonwebtoken");

app.use("/api", router);
router.use(cors({ origin: "http://localhost:3000", credentials: true }));
// router.use(cors())
router.use(express.json());
router.use(express.urlencoded({ extended: false }));

router.post("/login", (req, res, next) => {
  passport.authenticate("local", { session: false }, (err, user, info) => {
    console.log("Login: ", req.body, user, err, info);
    if (err) return next(err);
    if (user) {
      if (req.body.remember == true) {
        time_exp = "7d";
      }
      else time_exp = "1d";
      const token = jwt.sign(user, db.SECRET, {
        expiresIn: time_exp,
      });
      var decoded = jwt.decode(token);
      //let time = "" + new Date(decoded.exp * 1000);
      let time = new Date(decoded.exp * 1000);
      //let str = time.substring(0, 10);
      console.log("checkbox Remember me: ", new Date(decoded.exp * 1000));
      res.setHeader(
        "Set-Cookie",
        cookie.serialize("token", token, {
          httpOnly: true,
          secure: process.env.NODE_ENV !== "development",
          maxAge: 60 * 60,
          sameSite: "strict",
          path: "/",
        })
      );
      res.statusCode = 200;
      return res.json({ user, token });
    } else return res.status(422).json(info);
  })(req, res, next);
});

router.get("/logout", (req, res) => {
  res.setHeader(
    "Set-Cookie",
    cookie.serialize("token", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      maxAge: -1,
      sameSite: "strict",
      path: "/",
    })
  );
  res.statusCode = 200;
  return res.json({ message: "Logout successful" });
});

/* GET user profile. */
router.get(
  "/profile",
  passport.authenticate("jwt", { session: false }),
  (req, res, next) => {
    res.send(req.user);
  }
);

router.post("/register", async (req, res) => {
  try {
    const SALT_ROUND = 10;
    const { username, email, password } = req.body;
    if (!username || !email || !password)
      return res.json({ message: "Cannot register with empty string" });
    if (db.checkExistingUser(username) !== db.NOT_FOUND)
      return res.json({ message: "Duplicated user" });

    let id = users.users.length
      ? users.users[users.users.length - 1].id + 1
      : 1;
    hash = await bcrypt.hash(password, SALT_ROUND);
    users.users.push({ id, username, password: hash, email });
    res.status(200).json({ message: "Register success" });
  } catch {
    res.status(422).json({ message: "Cannot register" });
  }
});

router.get("/alluser", (req, res) => res.json(db.users.users));

router.get("/", (req, res, next) => {
  res.send("Respond without authentication");
});

router.get(
  "/foo",
  passport.authenticate("jwt", { session: false }),
  (req, res, next) => {
    res.status(200).json({ message: "Foo" });
  }
);

//<img src="pic_trulli.jpg" alt="Italian Trulli">

////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//<img className='test' src='/image/add_image.png' />

let students = {
  list: [
      { "id": "4010341", "name": "Pheeraphon", "surname": "Kunmuang", "major": "CoE",
       "gpa": 4.0 , "imageUrl" : src='./image/add_app.png'},
      { "id": "4010342", "name": "Foo", "surname": "Bar", "major": "FHT", "gpa": 2.3 },
  ],
};

  let income = 0;

  router
    .route("/students")
    .get((req, res) => {
      res.send(students);
    })
    .post((req, res) => {
      console.log(req.body);
      let newStudent = {};
      //console.log(todo.list.length ? todo.list[todo.list.length - 1].id + 1 : 1);
      newStudent.id = students.list.length ? students.list[students.list.length - 1].id + 1 : 1;
      newStudent.name = req.body.name;
      newStudent.surname = req.body.surname;
      newStudent.major = req.body.major;
      newStudent.gpa = req.body.gpa;
      newStudent.imageUrl = req.body.imageUrl;
      students = { list: [...students.list, newStudent] };
      res.json(students);
    });

  router
    .route("/students/:studentid")
    .get((req, res) => {
      let id = students.list.findIndex((item) => +item.id == +req.params.studentid)
      //console.log("id",id)
      res.json(students.list[id]);
    })
    .put((req, res) => {
      let id = students.list.findIndex((item) => item.id == +req.params.studentid);
      students.list[id].name = req.body.name;
      students.list[id].surname = req.body.surname;
      students.list[id].major = req.body.major;
      students.list[id].gpa = req.body.gpa;
      students.list[id].imageUrl = req.body.imageUrl;

      ///
      const handleChangeImage = e => {
        const file = e.target.files[0];
        const reader = new FileReader();

        reader.onload = (e) => {
            setImageUrl(e.target.result)
        }

        if (file)
            reader.readAsDataURL(file);
    }
    ///////////
      res.json(students.list);
    })
    .delete((req, res) => {
      students.list = students.list.filter((item) => +item.id !== +req.params.studentid);
      res.json(students.list);
    });
  /*  
    router.route("/income")
    .get((req,res) => {
      console.log("sss")
      res.json(income)
    });
  */
  router.route("/purchase/:studentId")
    .post((req, res) => {
      let id = students.list.findIndex((item) => +item.id == +req.params.studentId)
      if (id == -1) {
        res.json({ message: "Student not found" })
      }
      else {
        income = students.list[id].price;
        console.log(income)
        students.list = students.list.filter((item) => +item.id !== +req.params.studentId);
        res.json(students.list);
      }
    })

  // Error Handler
  app.use((err, req, res, next) => {
    let statusCode = err.status || 500;
    res.status(statusCode);
    res.json({
      error: {
        status: statusCode,
        message: err.message,
      },
    });
  });

  // Start Server
  app.listen(port, () => console.log(`Server is running on port ${port}`));
