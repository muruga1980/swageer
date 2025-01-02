import { FaSearch } from "react-icons/fa";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Navbar = () => {
  const navigate = useNavigate();
  const logOutHandler = () => {
    axios
      .get("http://localhost:5000/auth/logout")
      .then((res) => {
        if (res.data.status) {
          navigate("/login");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    logOutHandler();
  }, []);
  return (
    <>
      <div className="navbar-bg d-flex align-items-center justify-content-between ">
        <div className="input-group  searchBox align-items-center">
          <FaSearch />
          <input
            type="text"
            className="form-control"
            placeholder="Search here.."
            aria-label="Username"
            aria-describedby="basic-addon1"
          />
        </div>
        <div className="dropdown ">
          <a
            href="#"
            className="d-flex align-items-center text-white text-decoration-none dropdown-toggle"
            id="dropdownUser1"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <img
              src="https://github.com/mdo.png"
              alt=""
              width="32"
              height="32"
              className="rounded-circle me-1"
            />
            <small className="text-secondary">Admin</small>
          </a>
          <ul
            className="dropdown-menu dropdown-menu-dark text-small shadow"
            aria-labelledby="dropdownUser1"
          >
            <li>
              <a className="dropdown-item" href="#">
                New project...
              </a>
            </li>
            <li>
              <a className="dropdown-item" href="#">
                Settings
              </a>
            </li>
            <li>
              <a className="dropdown-item" href="#">
                Profile
              </a>
            </li>

            <li>
              <a className="dropdown-item" onClick={logOutHandler}>
                Sign out
              </a>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};
export default Navbar;
