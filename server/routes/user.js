import express from "express";
import bcrypt from "bcrypt";
import multer from "multer";

import { User } from "../models/userSchema.js";
import { Images } from "../models/uploadSchema.js";
// import { imageModal } from "../models/uploadSchema.js";

import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
const appRouter = express.Router();

/**
 * @usage : Register a User
 * @url : http://localhost:4000/signup
 * @body : username , email , password
 * @method : POST
 * @access : PUBLIC
 */

appRouter.post("/signup", async (req, res) => {
  try {
    const { userName, email, password } = req.body;

    const Exituser = await User.findOne({ email });
    // Check the user  existing or not with email?
    if (Exituser) {
      return res.json({ status: false, message: "Email Id already exists" });
    }
    // password encrypt
    const hassPassword = await bcrypt.hash(password, 5);
    // then save to new user
    const newUser = new User({
      userName,
      email,
      password: hassPassword,
    });
    // then save to db
    const savedUser = await newUser.save();
    res.json({
      status: true,
      message: "User Added successfully!",
      data: savedUser,
    });
  } catch (error) {
    res.status(500).json({ error: "internal server Error" });
  }
});

/**
 * @usage : Login a User
 * @url : http://localhost:4000/auth/login
 * @body : email, password
 * @method : POST
 * @access : PUBLIC
 */

appRouter.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(email, password);

    // check email exsiting or not
    const ExsitUser = await User.findOne({ email });
    if (!ExsitUser) {
      return res.json({ message: "User not registered" });
    }

    // check bcrypt password and compare
    const validPassword = await bcrypt.compare(password, ExsitUser.password);
    if (!validPassword) {
      return res.json({ message: "Password in correct" });
    }

    //jwt token cookie settings

    const setToken = jwt.sign(
      { userName: ExsitUser.userName },
      process.env.KEY,
      {
        expiresIn: "24h",
      }
    );

    //set token cookie parser
    res.cookie("token", setToken, { httpOnly: true, maxAge: 3600000 });

    return res.json({ status: true, message: "Login  succcessfully" });
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
});

/**
 * @usage : Forgot a possword
 * @url : http://localhost:4000/auth/forgotpassword
 * @body : email, password
 * @method : POST
 * @access : PUBLIC
 */

appRouter.post("/forgotpassword", async (req, res) => {
  try {
    const { email } = req.body;
    const validEmail = await User.findOne({ email });

    if (!validEmail) {
      return res.json({ ststus: false, message: "Email id not registerd" });
    }

    // node mailer send email to gmail or ur domain mail id

    const generateToken = jwt.sign({ id: validEmail._id }, process.env.KEY, {
      expiresIn: "15m",
    });

    var transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "murugaskpm@gmail.com",
        pass: "ehzxjklokydtcmvw",
      },
    });

    var mailOptions = {
      from: "murugaskpm@gmail.com",
      to: email,
      subject: "Please Verify Email",
      text: `http://localhost:5173/resetpassword/${generateToken}`,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        return res.json({ status: true, message: "error sending email " });
      } else {
        return res.json({ status: true, message: "email sent" });
      }
    });
  } catch (error) {
    console.log(err);
  }
});

/**
 * @usage : Reset Password
 * @url : http://localhost:4000/auth/resetpassword
 * @body :
 * @method : POST
 * @access : PUBLIC
 */

appRouter.post("/resetpassword/:tokenParms", async (req, res) => {
  const { tokenParms } = req.params;
  const { password } = req.body;
  try {
    const decoded = await jwt.verify(tokenParms, process.env.KEY);
    const id = decoded.id;

    const hashPassword = await bcrypt.hash(password, 10);
    await User.findByIdAndUpdate({ _id: id }, { password: hashPassword });
    return res.json({ status: true, message: "password updated successfully" });
  } catch (error) {
    return res.json({ message: "invalid token" });
  }
});

/**
 * @usage : Get user info
 * @url : http://localhost:4000/auth/verify
 * @body :
 * @method : GET
 * @access : PRIVATE
 */

const authMiddleware = async (req, res, next) => {
  try {
    // first veryfile the token exsit or not
    const verifyToken = req.cookies.token;
    if (!verifyToken) {
      return res.json({ status: false, message: "token not avaailable" });
    }
    // if token avaliable verify the token in the cookies
    const decoded = await jwt.verify(verifyToken, process.env.KEY);
    next();
  } catch (error) {
    return res.json({ status: false, message: "error" });
  }
};

appRouter.get("/verify", authMiddleware, (res) => {
  return res.json({ status: true, message: "token authorized" });
});

/**
 * @usage : Logout a User
 * @url : http://localhost:4000/auth/logout
 * @body :
 * @method : GET
 * @access : PUBLIC
 */

appRouter.get("/logout", (req, res) => {
  res.clearCookie("token");
  return res.status(400).json({ status: true, message: "Logout successfully" });
});

/**
 * @usage : Create a module api
 * @url : http://localhost:4000/auth/createmodule
 * @body : moduleName, domainName, basePath,uploadFile
 * @method : POST
 * @access : PRIVATE
 */

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

appRouter.post("/createmodule", upload.single("image"), async (req, res) => {
  console.log(req.file, req.body, 227);
  try {
    const { path, filename } = req.file;
    const { moduleName, domainName, basePath } = req.body;

    // check module exsiting or not
    if (!req.file) {
      return res.json({ message: "no file found" });
    }
    const fileUpload = await Images({
      path,
      filename,
      moduleName,
      domainName,
      basePath,
    });
    const uploadSuccess = await fileUpload.save();
    if (uploadSuccess) {
      return res.status(200).json({ message: "file upload successfully " });
    } else {
      return res.status(500).json({ message: "file not upload " });
    }
  } catch (error) {
    return res.json({ message: "invalid upload" });
  }
});

/**
 * @usage : Display module API
 * @url : http://localhost:4000/auth/modulelist
 * @body :
 * @method : GET
 * @access : PRIVATE
 */

appRouter.get("/modulelist", async (req, res) => {
  try {
    const checkModule = await Images.find();

    if (!checkModule) {
      return res.status(400).json("file not found");
    }
    res.send(checkModule);
  } catch (error) {
    console.log(error);
  }
});

/**
 * @usage : Display api one
 * @url : http://localhost:4000/auth/modulelistone
 * @body : ID
 * @method : GET
 * @access : PRIVATE
 */

appRouter.get("/modulelist/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const checkModule = await Images.findById(id);

    if (!checkModule) {
      return res.status(400).json("file not found");
    }
    res.send(checkModule);
  } catch (error) {
    console.log(error);
  }
});

/**
 * @usage : Delete one module
 * @url : http://localhost:5000/auth/modulelist+${id}
 * @body : ID
 * @method : DELETE
 * @access : PRIVATE
 */

appRouter.delete("/modulelist/:id", async (req, res) => {
  const { id } = req.params;

  try {
    if (id) {
      await Images.deleteOne({ _id: id });
      return res.status(200).json({ message: "File delete successfully " });
    } else {
      return res.status(400).json({ message: "File not available " });
    }
  } catch (error) {
    res.sendStatus(404);
    console.log(error);
  }
});

// appRouter.delete("/modulelist/:id", (req, res) => {
//   const { id } = req.params;
//   const index = Images.findIndex((item) => item.id === id);

//   // Check if data exists for the ID
//   if (index === -1) {
//     return res.status(404).send("Data not found");
//   }

//   // Remove data from the array using splice
//   User.splice(index, 1);

//   res.json({ message: "Data deleted successfully" });
// });

/**
 * @usage : Update one module
 * @url : http://localhost:5000/auth/modulelist+${id}
 * @body : ID
 * @method : PUT
 * @access : PRIVATE
 */

appRouter.put("/modulelist/:id", (req, res) => {
  const id = req.params.id;
  //const { path, filename } = req.file;
  const { moduleName, domainName, basePath } = req.body;

  Images.findByIdAndUpdate(
    { _id: id },
    {
      $set: {
        moduleName: moduleName,
        domainName: domainName,
        basePath: basePath,
      },
    }
  )
    .then((result) => {
      res.status(200).json({ update_product: result });
    })
    .catch((error) => {
      res.status(400).json(error);
    });
});

export { appRouter as UserRouter };
