import axios from "axios";

import { useNavigate, useParams } from "react-router-dom";
import Navbar from "./Navbar";

import { useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";
import { MdUpload } from "react-icons/md";

const Updatefile = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  console.log(id, 14);
  // Signup form - grab the fields

  // const [formData, setFormData] = useState([]);

  const [values, setValues] = useState({
    moduleName: "",
    domainName: "",
    basePath: "",
    // image: "",
  });

  useEffect(() => {
    axios
      .get("http://localhost:5000/auth/modulelist/" + id)

      .then((res) => {
        setValues(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const updateForm = (e) => {
    // const formData = new FormData();
    // formData.append("moduleName", values.moduleName);
    // formData.append("domainName", values.domainName);
    // formData.append("basePath", values.basePath);
    // // formData.append("image", values.image);

    e.preventDefault();
    axios
      .put("http://localhost:5000/auth/modulelist/" + id, values)
      .then((res) => {
        console.log(res.data);
        navigate("/modulelist");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <Navbar />

      <div className="p-4 bg-white m-3">
        <h4>Update module</h4>

        <div className="row">
          <div className="col-md-12 bg-light py-3">
            <form onSubmit={updateForm}>
              <div className="d-flex justify-content-around align-items-center ">
                <div className="col-md-5">
                  <div className="form-outline my-4">
                    <label className="form-label">Module Name</label>
                    <input
                      value={values.moduleName}
                      type="text"
                      className="form-control "
                      placeholder="Module name"
                      name="moduleName"
                      required
                      onChange={(e) =>
                        setValues({ ...values, moduleName: e.target.value })
                      }
                    />
                  </div>
                  <div className="form-outline my-4">
                    <label className="form-label">IP / Domain Name </label>
                    <input
                      type="text"
                      className="form-control "
                      placeholder="IP or Domain Name"
                      name="domainName"
                      required
                      value={values.domainName}
                      onChange={(e) =>
                        setValues({ ...values, domainName: e.target.value })
                      }
                    />
                  </div>

                  <div className="form-outline mb-3">
                    <label className="form-label">Base path</label>
                    <input
                      name="basePath"
                      value={values.basePath}
                      type="text"
                      className="form-control "
                      placeholder="Base path"
                      required
                      onChange={(e) =>
                        setValues({ ...values, basePath: e.target.value })
                      }
                    />
                  </div>
                </div>

                <div className="col-md-6">
                  <div className=" bg-secondary py-3 d-flex flex-column justify-content-center align-items-center bdr text-white">
                    <h4 className="mb-4"> Upload Swagger JSON</h4>
                    <div className=" bg-light p-5 upload">
                      <input
                        type="file"
                        id="file-input"
                        required
                        name="image"
                        // onChange={(e) =>
                        //   setValues({
                        //     ...values,
                        //     image: e.target.files[0],
                        //   })
                        // }
                      />
                      <label className="uploadIcon" htmlFor="file-input">
                        <MdUpload />
                      </label>
                      <FaTrash />
                    </div>
                  </div>
                  <div className="text-start  pt-2">
                    <button
                      type="submit"
                      className="btn btn-primary btn-lg w-100"
                    >
                      Update
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
export default Updatefile;
