import { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { FaEdit, FaTrash } from "react-icons/fa";
import { PiShoppingBagLight } from "react-icons/pi";
import axios from "axios";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Listmodules = () => {
  const [moduleApiListdata, setModuleApiListdata] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:5000/auth/modulelist")
      .then((res) => {
        // console.log(res.data);
        setModuleApiListdata(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [moduleApiListdata]);

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:5000/auth/modulelist/${id}`)
      .then((res) => {
        setModuleApiListdata(res.data);
        toast.error("Module deleted successfully", { autoClose: 1000 });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    handleDelete();
  }, []);

  return (
    <>
      <Navbar />
      <ToastContainer theme="colored" draggable />
      <div className="p-4 bg-white m-3 ">
        <h4>API Console</h4>

        <div className="row row-cols-1 row-cols-md-4 g-4 pt-2">
          {moduleApiListdata.length > 0 &&
            moduleApiListdata.map((items) => {
              return (
                <>
                  <div className="col" key={items._id}>
                    <div className="card h-100 shadow position-relative">
                      <Link
                        to={`/modulelist/${items._id}`}
                        className="text-decoration-none"
                      >
                        <div className=" bg-primary py-3 text-white display-1 text-center">
                          <PiShoppingBagLight />
                        </div>
                      </Link>
                      <div className="card-body  ">
                        <h5 className="card-title ">{items.moduleName}</h5>
                        <p className="card-subtitle mb-4 text-muted">
                          {items.domainName}
                        </p>

                        <p className="card-text px-3">
                          <small className="text-muted  d-flex align-items-center justify-content-end">
                            <Link
                              to={`/updatefile/${items._id}`}
                              className="text-decoration"
                            >
                              <span className="  icon-circle circle-color1">
                                <FaEdit className="text-white" />
                              </span>
                            </Link>
                            <span
                              className="icon-circle circle-color2"
                              style={{ cursor: "pointer" }}
                              onClick={() => handleDelete(items._id)}
                            >
                              <FaTrash className="text-white" />
                            </span>
                          </small>
                        </p>
                      </div>
                    </div>
                  </div>
                </>
              );
            })}
        </div>
      </div>
    </>
  );
};
export default Listmodules;
