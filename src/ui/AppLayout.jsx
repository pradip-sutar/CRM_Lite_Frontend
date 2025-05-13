import { Outlet } from "react-router-dom";
import Main from "./Main";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import Footer from "./Footer";
// import "./AppLayout.css"
function AppLayout() {
  return (
    <>
      <Main>
        <Sidebar />
        <div className="layout-page">
          <Navbar />
          <div className="content-wrapper" style={{ minHeight: "84%" }}>
            <div className="main-content">
              <Outlet />
              <Footer />
            </div>
          </div>
        </div>
      </Main>
    </>
  );
}

export default AppLayout;
