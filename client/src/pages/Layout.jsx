import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";

const Layout = () => {
  return (
    <>
      <div>
        <Sidebar />
      </div>

      <main>
        <Outlet />
      </main>
    </>
  );
};
export default Layout;
