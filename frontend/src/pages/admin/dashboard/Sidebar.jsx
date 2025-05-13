import { FaBook, FaUsers, FaShoppingCart, FaChartLine } from "react-icons/fa";
import { Link } from "react-router-dom";

const Sidebar = () => {
    return (
        <div className="fixed w-64 h-screen text-white bg-gray-800">
            <div className="p-6">
                <h1 className="text-2xl font-bold">Admin Dashboard</h1>
            </div>
            <nav className="mt-6">
                <Link
                    to="/dashboard"
                    className="flex items-center px-6 py-3 hover:bg-gray-700"
                >
                    <FaChartLine className="mr-3" />
                    Thống kê
                </Link>
                <Link
                    to="/dashboard/manage-book"
                    className="flex items-center px-6 py-3 hover:bg-gray-700"
                >
                    <FaBook className="mr-3" />
                    Quản lý sách
                </Link>
                <Link
                    to="/dashboard/users"
                    className="flex items-center px-6 py-3 hover:bg-gray-700"
                >
                    <FaUsers className="mr-3" />
                    Quản lý người dùng
                </Link>
                <Link
                    to="/dashboard/orders"
                    className="flex items-center px-6 py-3 hover:bg-gray-700"
                >
                    <FaShoppingCart className="mr-3" />
                    Quản lý đơn hàng
                </Link>
            </nav>
        </div>
    );
};

export default Sidebar;