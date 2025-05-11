import Sidebar from "./Sidebar";
import DashboardStats from "./DashboardStats";
import NavBarAdmin from "../../../components/NavBarAdmin";
import ManageBookPage from "../managebooks/ManageBookPage";
import { Outlet } from "react-router-dom";


const AdminDashboard = () => {
    return (
        <div className="flex h-screen bg-gray-200">
            <Sidebar  />
            <div className="flex flex-col gap-4 ml-64">
                    <NavBarAdmin/>
                    <div className="p-4">
                        <Outlet/>
                    </div>  
                </div>
        </div>
    );
};

export default AdminDashboard;