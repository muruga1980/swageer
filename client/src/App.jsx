import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js";
import "./app.css";
import "swagger-ui-react/swagger-ui.css";
import "react-toastify/dist/ReactToastify.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Addfile from "./components/Addfile";
import Login from "./components/Login";
import Signup from "./components/Signup.jsx";
import Forgotpassword from "./components/Forgotpassword";
import Layout from "./pages/Layout";
import Resetpassword from "./components/Resetpassword";
import Notfound from "./utils/Notfound";
import Dashboard from "./components/Dashboard";

import Listmodules from "./components/Listmodules.jsx";
import Singlemodules from "./components/Singlemodules.jsx";

import Updatefile from "./components/Updatefile.jsx";

const approuter = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <Notfound />,
    children: [
      {
        path: "/",
        element: <Dashboard />,
      },
      {
        path: "/addfile",
        element: <Addfile />,
      },
      {
        path: "/modulelist",
        element: <Listmodules />,
      },
      {
        path: "/modulelist/:id",
        element: <Singlemodules />,
      },
      {
        path: "/updatefile/:id",
        element: <Updatefile />,
      },
    ],
  },
  {
    path: "login",
    element: <Login />,
  },
  {
    path: "signup",
    element: <Signup />,
  },
  {
    path: "forgotpassword",
    element: <Forgotpassword />,
  },
  {
    path: "resetpassword/:tokenParms",
    element: <Resetpassword />,
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={approuter} />
    </>
  );
}

export default App;
