import logo from "../assets/logo1.png";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { ForgotSchema } from "../utils/SignupSchema";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { useState } from "react";
import { FaInfo } from "react-icons/fa";

const Forgotpassword = () => {
  const [serverResopnseMsg, setServerResopnseMsg] = useState(null);
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
            <h2 className="pt-4">Forgot Password</h2>
            <p className="text-secondary fw-semibold">
              Please Provide registered email id and get the reset link
            </p>
          </div>

          <Formik
            initialValues={{
              email: "",
            }}
            validationSchema={ForgotSchema}
            onSubmit={(values) => {
              console.log(values);
              const { email } = values;
              try {
                axios
                  .post("http://localhost:5000/auth/forgotpassword", {
                    email,
                  })
                  .then((res) => {
                    if (res.data.status) {
                      navigate("/login");
                      alert("you will get reset link registerd email");
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
                  <span className="tex-danger">*</span> Email{" "}
                </label>
                <Field
                  type="email"
                  name="email"
                  className="form-control "
                  placeholder="Enter your email id "
                />
                <small className="text-danger">
                  <ErrorMessage name="email" />
                </small>
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
                <button type="submit" className="btn btn-primary btn-lg w-100">
                  Request reset link
                </button>

                <p className="my-3 text-secondary fw-semibold text-center">
                  <Link to={"/login"} className="link-danger">
                    Back to login
                  </Link>
                </p>
              </div>
            </Form>
          </Formik>
        </div>
      </section>
    </>
  );
};
export default Forgotpassword;
