import axios from "axios";
import { useNavigate } from "react-router-dom";

const Addfile = () => {
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
  return (
    <>
      <div className="py-3 text-center" onClick={logOutHandler}>
        Logout
      </div>
    </>
  );
};
export default Addfile;
