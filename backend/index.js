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

let shops = {
  list: [
    {
      "id": "4010341", "name": "ไม้แขวนผ้า", "description": "ใช้แขวนเสื้อ", "price": " 10",
      "quantity": 4, "imageUrl": "https://firebasestorage.googleapis.com/v0/b/nextjs-1dafc.appspot.com/o/images%2Ft2.jpg?alt=media&token=fb505f00-5825-4aad-885f-c4f5d29b8eb0"
    },
    {
      "id": "4010342", "name": "ตะกร้าช๊อปปิ้ง สีดำหูสี", "description": "ตะกร้า", "price": 10, "quantity": 50
      , "imageUrl": 'https://firebasestorage.googleapis.com/v0/b/nextjs-1dafc.appspot.com/o/images%2Fi1.jpg?alt=media&token=95092e02-343d-4390-8605-22d611d53090'
    },
    {
      "id": "4010343", "name": "ชั้นวางของ 2 ชั้น หูกระต่าย", "description": "ชั้นวางของ", "price": 20, "quantity": 50
      , "imageUrl": 'http://www.20บาท.com/uploads/product/TF41-006(%E0%B9%83%E0%B8%AB%E0%B8%A1%E0%B9%88)_resize_20180716163846.jpg'
    }
  ],
};

let income = 0;

router
  .route("/shops")
  .get((req, res) => {
    res.send(shops);
  })
  .post((req, res) => {
    console.log(req.body);
    let newShop = {};
    //console.log(todo.list.length ? todo.list[todo.list.length - 1].id + 1 : 1);
    newShop.id = shops.list.length ? shops.list[shops.list.length - 1].id + 1 : 1;
    newShop.name = req.body.name;
    newShop.description = req.body.description;
    newShop.price = req.body.price;
    newShop.quantity = req.body.quantity;
    newShop.imageUrl = req.body.imageUrl;
    shops = { list: [...shops.list, newShop] };
    res.json(shops);
  });

router
  .route("/shops/:shopid")
  .get((req, res) => {
    let id = shops.list.findIndex((item) => +item.id == +req.params.shopid)
    //console.log("id",id)
    res.json(shops.list[id]);
  })
  .put((req, res) => {
    let id = shops.list.findIndex((item) => item.id == +req.params.shopid);
    shops.list[id].name = req.body.name;
    shops.list[id].description = req.body.description;
    shops.list[id].price = req.body.price;
    shops.list[id].quantity = req.body.quantity;
    shops.list[id].imageUrl = req.body.imageUrl;

    //   ///
    //   const handleChangeImage = e => {
    //     const file = e.target.files[0];
    //     const reader = new FileReader();

    //     reader.onload = (e) => {
    //         setImageUrl(e.target.result)
    //     }

    //     if (file)
    //         reader.readAsDataURL(file);
    // }
    // ///////////
    res.json(shops.list);
  })
  .delete((req, res) => {
    shops.list = shops.list.filter((item) => +item.id !== +req.params.shopid);
    res.json(shops.list);
  });
/*  
  router.route("/income")
  .get((req,res) => {
    console.log("sss")
    res.json(income)
  });
*/
router.route("/purchase/:shopId")
  .post((req, res) => {
    let id = shops.list.findIndex((item) => +item.id == +req.params.shopId)
    if (id == -1) {
      res.json({ message: "Student not found" })
    }
    else {
      income = shops.list[id].price;
      console.log(income)
      shops.list = shops.list.filter((item) => +item.id !== +req.params.shopId);
      res.json(shops.list);
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

  //name  description price quantity  imageUrl 
