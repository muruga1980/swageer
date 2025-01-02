// import loginImg from "../assets/login.svg";

import logo from "../assets/logo1.png";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { SignupSchema } from "../utils/SignupSchema";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { FaEyeSlash, FaEye, FaInfo } from "react-icons/fa";
import { useState } from "react";

const Signup = () => {
  const navigate = useNavigate();

  const [isReveledPwd, setIsReveledPwd] = useState(false);
  const [serverResopnseMsg, setServerResopnseMsg] = useState("");
  const [alertBox, setAlertBox] = useState(false);
  /* const [pwd, setPwd] = useState();*/

  return (
    <>
      <section className="d-flex justify-content-center align-items-center vh-100 login-bg ">
        <div className="minWidth  bg-white p-5 bdrRadius15 shadow ">
          <div className="text-center">
            <img src={logo} alt="logo" />
            <hr />
            <h2 className="pt-4">Create an account</h2>
            <p className="text-secondary fw-semibold">
              Join for exclusive access !
            </p>
          </div>
          <Formik
            initialValues={{
              userName: "",
              email: "",
              password: "",
            }}
            validationSchema={SignupSchema}
            onSubmit={(values) => {
              // console.log(values);
              const { userName, email, password } = values;

              try {
                axios
                  .post("http://localhost:5000/auth/signup", {
                    userName,
                    email,
                    password,
                  })
                  .then((res) => {
                    if (res.data.status) {
                      navigate("/login");
                      setServerResopnseMsg(res.data.message);
                      setAlertBox(true);
                    } else {
                      setServerResopnseMsg(res.data.message);
                      setAlertBox(true);
                    }
                  });
              } catch (error) {
                console.log(error);
              }
            }}
          >
            <Form>
              <div className="form-outline my-4">
                <label className="form-label">
                  <span className="tex-danger">*</span> User name
                </label>
                <Field
                  type="text"
                  name="userName"
                  className="form-control "
                  placeholder="Enter your user name"
                />
                <small className="text-danger">
                  <ErrorMessage name="userName" />
                </small>
              </div>
              <div className="form-outline my-4">
                <label className="form-label">
                  <span className="tex-danger">*</span> Email
                </label>
                <Field
                  type="email"
                  name="email"
                  className="form-control "
                  placeholder="Enter your email id"
                />
                <small className="text-danger">
                  <ErrorMessage name="email" />
                </small>
              </div>

              <div className="form-outline mb-3 position-relative">
                <label className="form-label">
                  <span className="tex-danger">*</span> Password
                </label>
                <Field
                  /* onChange={(e) => setPwd(e.target.vale)}
                        value={pwd}*/
                  type={isReveledPwd ? "text" : "password"}
                  className="form-control "
                  placeholder="Enter your password"
                  name="password"
                />

                <span
                  className="pass_hiden"
                  onClick={() => setIsReveledPwd((prevState) => !prevState)}
                >
                  {isReveledPwd ? <FaEyeSlash /> : <FaEye />}
                </span>

                <small className="text-danger">
                  <ErrorMessage name="password" />
                </small>
              </div>

              {alertBox ? (
                <div className="alert alert-danger" role="alert">
                  <span>
                    <FaInfo />
                  </span>{" "}
                  {serverResopnseMsg}
                </div>
              ) : null}

              <div className="text-center text-lg-start mt-4 pt-2">
                <button type="submit" className="btn btn-primary btn-lg w-100">
                  Create Account
                </button>
                <p className="my-3 text-secondary fw-semibold text-center">
                  Already have an account ?
                  <Link to={"/login"} className="link-danger">
                    {" "}
                    Login
                  </Link>
                </p>
              </div>
            </Form>
          </Formik>
          <p className="text-center  pt-3 text-muted">
            <small> © - OASYS Cybernetics Pvt. Ltd </small>
          </p>
        </div>
      </section>
    </>
  );
};
export default Signup;
