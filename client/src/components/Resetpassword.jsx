import resetImg from "../assets/change-password.png";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { ResetSchema } from "../utils/SignupSchema";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { useState } from "react";
import { FaEye, FaEyeSlash, FaInfo } from "react-icons/fa";

const Resetpassword = () => {
  const [isReveledPwd, setIsReveledPwd] = useState("");
  const [serverResopnseMsg, setServerResopnseMsg] = useState("");
  const [alertBox, setAlertBox] = useState(false);

  const navigate = useNavigate();
  const { tokenParms } = useParams();
  axios.defaults.withCredentials = true;

  return (
    <>
      <section className="d-flex justify-content-center align-items-center vh-100 bg-info-subtle">
        <div className="container">
          <div className="row justify-content-center align-items-center bg-white p-5 bdrRadius25 shadow">
            <div className="col-md-6 bg-info-subtle  bdrRadius25">
              <img src={resetImg} className="img-fluid" alt="Reset Image" />
            </div>

            <div className="col-md-5 ms-auto">
              <div className="text-center">
                <h2 className="pt-3">Change password</h2>
                <p className="text-secondary fw-semibold">Unlock your world.</p>
              </div>

              <Formik
                initialValues={{
                  password: "",
                }}
                validationSchema={ResetSchema}
                onSubmit={(values) => {
                  // console.log(tokenparms);
                  const { password } = values;

                  try {
                    axios
                      .post(
                        "http://localhost:5000/auth/resetpassword/" +
                          tokenParms,
                        {
                          password,
                        }
                      )
                      .then((res) => {
                        if (res.data.status) {
                          navigate("/login");
                        }
                        setServerResopnseMsg(res.data.message);
                        setAlertBox(true);
                      });
                  } catch (error) {
                    console.log(error);
                  }
                }}
              >
                {({ isSubmitting }) => (
                  <Form>
                    <div className="form-outline mb-3 position-relative">
                      <label className="form-label">
                        <span className="tex-danger">*</span> Password
                      </label>
                      <Field
                        type={isReveledPwd ? "text" : "password"}
                        className="form-control"
                        placeholder="Enter new password"
                        name="password"
                      />
                      <span
                        className="pass_hiden"
                        onClick={() =>
                          setIsReveledPwd((prevState) => !prevState)
                        }
                      >
                        {isReveledPwd ? <FaEye /> : <FaEyeSlash />}
                      </span>

                      <small className="text-danger">
                        <ErrorMessage name="password" />
                      </small>
                    </div>
                    {/* 
                    <div className="form-outline mb-3">
                      <label className="form-label">
                        {" "}
                        <span className="tex-danger">*</span> Confirm Password
                      </label>
                      <Field
                        type="password"
                        className="form-control"
                        placeholder="Confirm new password"
                        name="confirmPassword"
                        maxLength="8"
                      />
                      <small className="text-danger">
                        <ErrorMessage name="confirmPassword" />
                      </small>
                    </div> */}

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
                        className="btn btn-primary btn-lg w-100"
                        disabled={isSubmitting}
                      >
                        Reset Password
                      </button>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
export default Resetpassword;
