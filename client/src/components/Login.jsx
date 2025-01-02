import logo from "../assets/logo1.png";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { LoginSchema } from "../utils/SignupSchema";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { FaEye, FaEyeSlash, FaInfo } from "react-icons/fa";
import { useState } from "react";

const Login = () => {
  const [isReveledPwd, setIsReveledPwd] = useState("");
  const [serverResopnseMsg, setServerResopnseMsg] = useState("");
  const [alertBox, setAlertBox] = useState(false);
  const navigate = useNavigate();
  axios.defaults.withCredentials = true;

  return (
    <>
      <section className="d-flex justify-content-center align-items-center vh-100 login-bg ">
        <div className="minWidth  bg-white p-5 bdrRadius15 shadow ">
          <div className="text-center">
            <img src={logo} alt="logo" />
            <hr />
            <h2 className="pt-4">Sign In</h2>
            <p className="text-secondary fw-semibold">
              Please enter your details to sign in.
            </p>
          </div>

          <Formik
            initialValues={{
              email: "",
              password: "",
            }}
            validationSchema={LoginSchema}
            onSubmit={(values) => {
              console.log(values);
              const { email, password } = values;

              try {
                axios
                  .post("http://localhost:5000/auth/login", {
                    email,
                    password,
                  })
                  .then((res) => {
                    if (res.data.status) {
                      navigate("/dashboard");
                    }
                    setServerResopnseMsg(res.data.message);
                    setAlertBox(true);
                  });
              } catch (error) {
                console.log(error);
              }
            }}
          >
            <Form>
              <div className="form-outline my-4">
                <label className="form-label">
                  <span className="text-danger">*</span> E-mail Address
                </label>
                <Field
                  type="email"
                  name="email"
                  className="form-control "
                  placeholder="Enter your email "
                />
                <small className="text-danger">
                  <ErrorMessage name="email" />
                </small>
              </div>

              <div className="form-outline mb-3 position-relative">
                <label className="form-label">
                  <span className="text-danger">*</span> Password
                </label>
                <Field
                  type={isReveledPwd ? "text" : "password"}
                  className="form-control "
                  placeholder="**********"
                  name="password"
                />
                <span
                  className="pass_hiden"
                  onClick={() => setIsReveledPwd((prevState) => !prevState)}
                >
                  {isReveledPwd ? <FaEye /> : <FaEyeSlash />}
                </span>
                <small className="text-danger">
                  <ErrorMessage name="password" />
                </small>
              </div>

              <div className="d-flex justify-content-between align-items-center">
                <div className="form-check mb-0">
                  <input className="form-check-input me-2" type="checkbox" />
                  <label className="form-check-label">Remember me</label>
                </div>
                <Link to="/forgotpassword" className="text-body">
                  Forgot password?
                </Link>
              </div>

              {alertBox ? (
                <div className="alert alert-danger mt-4" role="alert">
                  <span>
                    <FaInfo />
                  </span>{" "}
                  {serverResopnseMsg}
                </div>
              ) : null}

              <div className="text-center text-lg-start mt-4 pt-2">
                <button
                  type="submit"
                  className="btn btn-primary btn-lg w-100 shadow"
                >
                  Sign In
                </button>
                <p className="my-3 text-secondary fw-semibold text-center">
                  Dont have an account yet ?{" "}
                  <Link
                    to={"/signup"}
                    className="link-danger text-decoration-none"
                  >
                    Sign Up
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
export default Login;
