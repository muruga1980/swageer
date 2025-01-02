import { useEffect, useState } from "react";
import Navbar from "./Navbar";
import axios from "axios";
import { useParams } from "react-router-dom";
import SwaggerUI from "swagger-ui-react";

const Singlemodules = () => {
  const [singleAPiData, setSingleAPiData] = useState("");
  const [pathData, setPathData] = useState("");

  const { _id, domainName, basePath } = singleAPiData;

  console.log(pathData, 15);
  const { id } = useParams();
  //   const swagerPath = path.slice(8);

  //console.log(swagerPath, 16);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/auth/modulelist/${id}`)
      .then((res) => {
        setSingleAPiData(res.data);
        setPathData(res.data.path.slice(8));
        console.log(res.data.path.slice(8), 26);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  return (
    <>
      <Navbar />
      <div className="container-fluid">
        <div className="p-4 bg-white my-3 bdrRadius15">
          <h4>View APIs</h4>
          <hr />

          <div className="row row-cols-1  ">
            <>
              <div className="col" key={_id}>
                <div className="card h-100 shadow position-relative">
                  <div className=" bg-primary p-3 text-white">
                    <h5 className="card-title">{basePath}</h5>
                    <p className="card-subtitle mb-2 text-light">
                      {domainName}
                    </p>
                  </div>

                  <div className="card-body p-0">
                    <h6 className="card-subtitle mb-2 text-muted p-3">
                      {basePath}
                    </h6>
                  </div>

                  <SwaggerUI
                    url={"http://localhost:5000/images/" + pathData}
                    docExpansion={"full"}
                  />
                </div>
              </div>
            </>
          </div>
        </div>
      </div>
    </>
  );
};
export default Singlemodules;
