import { Outlet } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";

function App() {
  return (
    <>
      <Sidebar />
      <Navbar />
      <div className="p-2 pt-14 md:pt-2 md:pl-60">
        <Outlet />
      </div>
    </>
  );
}

export default App;
