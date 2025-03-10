import { Outlet } from "react-router-dom";
import Header from "../Header.tsx";



function MainLayout() {
  return (
    <div className="wrapper">
      <Header />
      <Outlet />
    </div>
  );
}

export default MainLayout;
