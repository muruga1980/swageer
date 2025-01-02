import Logo from "../assets/logo1.png";
import { BsFillGearFill } from "react-icons/bs";
import { FaChartSimple } from "react-icons/fa6";

import { Link } from "react-router-dom";
const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="text-center pb-2 d-flex align-items-center border-bottom">
        <a href="/">
          <img
            src={Logo}
            alt="oasys"
            title="OASYS"
            className="pe-2"
            style={{ width: "70px" }}
          />
        </a>
        <p className="fs-5 fw-semibold p-0 m-0 ps-2 text-warning border-start ">
          API Publisher
        </p>
      </div>

      <nav className="nav nav-pills nav-fill flex-column pt-4">
        {/* <Link to="/dashboard" className="nav-link " aria-current="page">
          <span className="pe-1">
            <BiSolidDashboard />
          </span>
          Dashboard
        </Link> */}

        <Link to="/addfile" className="nav-link " aria-current="page">
          <span className="pe-1">
            <BsFillGearFill />
          </span>
          Add APIs
        </Link>

        <Link to="/modulelist" className="nav-link" href="#">
          <span className="pe-1">
            <FaChartSimple />
          </span>
          List APIs
        </Link>
      </nav>
    </div>
  );
};
export default Sidebar;
