import { createContext, useContext, useEffect, useState } from "react";
import { useLoginUserMutation, useRegisterNewUserMutation } from "../redux/features/auth/authApi";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";


const AuthContext = createContext()
export const useAuth = () => {
    return useContext(AuthContext)
}

export const AuthProvide = ({ children }) => {
    const navigate = useNavigate()
    const [loginUser, { isError }] = useLoginUserMutation()
    const [registerNewUser] = useRegisterNewUserMutation()
    const [currentUser, setCurrentUser] = useState(null)

    //register user
    const registerUser = async (data) => {
        try {
            const response = await registerNewUser(data)
            console.log(response);
        } catch (error) {
            console.log(error);
        }
    }

    const logIn = async (data) => {
        try {
            const response = await loginUser(data)
            const token = await response.data.token;
            localStorage.setItem('token', token);
            setCurrentUser(response.data.user)
            await Swal.fire({
                position: "center",
                icon: "success",
                title: "Đăng nhập thành công",
                showConfirmButton: false,
                timer: 1500
            }).then(() => {
                navigate("/");
            })

        } catch (error) {
            console.log(error, "loi");
            Swal.fire({
                position: "center",
                icon: "error",
                title: "Email hoặc mật khẩu sai",
                showConfirmButton: false,
                timer: 2000
            });
        }
    };


    const logOut = async () => {
        try {
            setCurrentUser(null)
            localStorage.removeItem('token')
        } catch (error) {
            console.log(error);

        }
    }

    const value = {
        currentUser,
        registerUser,
        logIn,
        logOut,
        setCurrentUser
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}