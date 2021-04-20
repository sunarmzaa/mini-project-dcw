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
       "gpa": 4.0 , "imageUrl" : "data:image/png;base64,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"},
      { "id": "4010342", "name": "Foo", "surname": "Bar", "major": "FHT", "gpa": 2.3 
    ,"imageUrl" : 'data:image/png;base64,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'},
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
