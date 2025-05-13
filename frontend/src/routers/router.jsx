import App from "../App.jsx"
import { createBrowserRouter } from "react-router-dom";
import HomePage from "../pages/home/HomePage.jsx";
import Register from "../components/Register.jsx";
import Login from "../components/Login.jsx";
import CartPage from "../pages/books/CartPage.jsx"
import CheckoutPage from "../pages/books/CheckoutPage.jsx"
import SingleBook from "../pages/books/SingleBook.jsx";
import DetailPage from "../pages/detailpage/DetailPage.jsx";
import PrivateRoute from "./PrivateRoute.jsx";
import AdminRoute from "./AdminRoute.jsx";
import AdminLogin from "../components/AdminLogin.jsx";
import AdminDashboard from "../pages/admin/dashboard/AdminDasboard.jsx"
import ManageBookPage from "../pages/admin/managebooks/ManageBookPage.jsx";
import DashboardStats from "../pages/admin/dashboard/DashboardStats.jsx";
import AddBook from "../pages/admin/managebooks/AddBook.jsx";
import ManageUsers from "../pages/admin/manageusers/ManageUsers.jsx";
import OrderLists from "../pages/orders/OrderLists.jsx";
import BooksSearchPage from "../pages/searchpage/BooksSearchPage.jsx";
import UserProfile from "../pages/userprofile/UserProfile.jsx";
import ManageOrders from "../pages/admin/manageorders/ManageOrders.jsx";

const router =createBrowserRouter([
    {
        path:"/",
        element:<App/>,
        children:[
            {
                path:"/",
                element:<HomePage/>
            },
            {
                path:"/profile",
                element:<PrivateRoute><UserProfile/></PrivateRoute>
            },
            {
                path:"/about",
                element:<div>about</div>
            },
            {
                path:"/search",
                element:<BooksSearchPage/>
            },
            {
                path: "/orders",
                element: <PrivateRoute><OrderLists/></PrivateRoute>
            },
            {
                path:"/login",
                element: <Login/>
            },
            {
                path: "/register",
                element: <Register/>
            },
            {
                path:"/cart",
                element:<CartPage/>
            },
            {
                path:"/checkout",
                element:<PrivateRoute><CheckoutPage/></PrivateRoute>
            },
            {
                path:"/books/:id",
                element:<SingleBook/>
            },
            {
                path:"/detail-page",
                element:<DetailPage/>
            }
        ]
    },
    {
        path:"/admin",
        element:<AdminLogin/>
    },
    {
        path:"/dashboard",
        element:<AdminRoute><AdminDashboard/></AdminRoute>,
        children:[
            {
                path:"",
                element: <AdminRoute><DashboardStats/></AdminRoute>
            },
            {
                path:"manage-book",
                element: <AdminRoute><ManageBookPage/></AdminRoute>,
                children:[
                    {
                        path:"add-book",
                        element:<AddBook/>
                    },
                ]

            },
            {
                path:"users",
                element:<AdminRoute><ManageUsers/></AdminRoute>
            },
            {
                path:"orders",
                element:<AdminRoute><ManageOrders/></AdminRoute>
            }
        ]
    }
])
export default router