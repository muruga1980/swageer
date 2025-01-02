import axios from "axios";

import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

import { useState } from "react";
import { FaTrash } from "react-icons/fa";
import { MdUpload } from "react-icons/md";

const Addfile = () => {
  const navigate = useNavigate();
  // Signup form - grab the fields

  const [formValue, setFormValue] = useState({
    moduleName: "",
    domainName: "",
    basePath: "",
    image: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("moduleName", formValue.moduleName);
    formData.append("domainName", formValue.domainName);
    formData.append("basePath", formValue.basePath);
    formData.append("image", formValue.image);

    axios
      .post("http://localhost:5000/auth/createmodule", formData)

      .then(() => {
        navigate("/modulelist");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <>
      <Navbar />

      <div className="p-4 bg-white m-3">
        <h4>Create New module</h4>

        <div className="row">
          <div className="col-md-12 bg-light py-3">
            <form onSubmit={handleSubmit} method="post" id="upload">
              <div className="d-flex justify-content-around align-items-center ">
                <div className="col-md-5">
                  <div className="form-outline my-4">
                    <label className="form-label">Module Name</label>
                    <input
                      onChange={(e) =>
                        setFormValue({
                          ...formValue,
                          moduleName: e.target.value,
                        })
                      }
                      type="text"
                      className="form-control "
                      placeholder="Module name"
                      required
                    />
                  </div>
                  <div className="form-outline my-4">
                    <label className="form-label">IP / Domain Name </label>
                    <input
                      onChange={(e) =>
                        setFormValue({
                          ...formValue,
                          domainName: e.target.value,
                        })
                      }
                      type="text"
                      className="form-control "
                      placeholder="IP or Domain Name"
                      required
                    />
                  </div>

                  <div className="form-outline mb-3">
                    <label className="form-label">Base path</label>
                    <input
                      onChange={(e) =>
                        setFormValue({
                          ...formValue,
                          basePath: e.target.value,
                        })
                      }
                      type="text"
                      className="form-control "
                      placeholder="Base path"
                      required
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
                        onChange={(e) =>
                          setFormValue({
                            ...formValue,
                            image: e.target.files[0],
                          })
                        }
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
                      Save
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
export default Addfile;
