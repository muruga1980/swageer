// import loginImg from "../assets/login.svg";
import { useState } from "react";
import signUpImg from "../assets/signup.svg";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();
  // Signup form - grab the fields

  const [formValue, setFormValue] = useState({
    userName: "",
    email: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const { userName, email, password } = formValue;

    axios
      .post("http://localhost:4000/auth/signup", { userName, email, password })
      .then(() => {
        navigate("/login");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <>
      <section className="d-flex justify-content-center align-items-center h-100">
        <div className="container">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-md-9 col-lg-6 col-xl-5">
              <img src={signUpImg} className="img-fluid" alt="SignUp Image" />
            </div>
            <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
              <h2 className="py-3">Sign Up</h2>
              <hr />
              <form onSubmit={handleSubmit} method="post">
                <div className="form-outline my-4">
                  <label className="form-label">User Name</label>
                  <input
                    onChange={(e) =>
                      setFormValue({ ...formValue, userName: e.target.value })
                    }
                    type="text"
                    className="form-control form-control-lg"
                    placeholder="Full name"
                  />
                </div>
                <div className="form-outline my-4">
                  <label className="form-label">Email address</label>
                  <input
                    onChange={(e) =>
                      setFormValue({ ...formValue, email: e.target.value })
                    }
                    type="email"
                    className="form-control form-control-lg"
                    placeholder="Email address"
                    required
                  />
                </div>

                <div className="form-outline mb-3">
                  <label className="form-label">Password</label>
                  <input
                    onChange={(e) =>
                      setFormValue({ ...formValue, password: e.target.value })
                    }
                    type="password"
                    className="form-control form-control-lg"
                    placeholder="Password"
                    required
                  />
                </div>

                <div className="d-flex justify-content-between align-items-center">
                  <div className="form-check mb-0">
                    <input
                      className="form-check-input me-2"
                      type="checkbox"
                      value=""
                      id="form2Example3"
                    />
                    <label className="form-check-label">Remember me</label>
                  </div>
                  <a href="#!" className="text-body">
                    Forgot password?
                  </a>
                </div>

                <div className="text-center text-lg-start mt-4 pt-2">
                  <button
                    type="submit"
                    className="btn btn-primary btn-lg w-100"
                  >
                    Submit
                  </button>
                  <p className="small fw-bold mt-2 pt-1 mb-0">
                    Already have an account?{" "}
                    <Link to={"/login"} className="link-danger">
                      Login
                    </Link>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
export default Signup;
