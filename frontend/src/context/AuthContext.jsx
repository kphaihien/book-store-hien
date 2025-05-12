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
    const [loginUser, ] = useLoginUserMutation()
    const [registerNewUser,] = useRegisterNewUserMutation()
    const [currentUser, setCurrentUser] = useState(null)

    //register user
    const registerUser = async (data) => {
        try {
            const response = await registerNewUser(data).unwrap()
                await Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Đăng kí thành công",
                    showConfirmButton: false,
                    timer: 1500
                }).then(()=>navigate("/login")) 

        } catch (error) {
            console.log(error);
            
            if (error.status === 409) {
                await Swal.fire({
                    position: "center",
                    icon: "error",
                    title: error.data.message,
                    showConfirmButton: false,
                    timer: 1500
                })
            }else if(error.status===500){
                await Swal.fire({
                    position: "center",
                    icon: "error",
                    title: "Đã xảy ra lỗi khi đăng kí, thử lại sau.",
                    showConfirmButton: false,
                    timer: 1500
                })
            }
        }
    }

    const logIn = async (data) => {
        try {
            const response = await loginUser(data).unwrap()      
            const token = await response.token;
            localStorage.setItem('token', token);
            setCurrentUser(response.user)
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
            if (error.status === 401) {
                await Swal.fire({
                    position: "center",
                    icon: "error",
                    title: error.data.message,
                    showConfirmButton: false,
                    timer: 1500
                })
            } else if (error.status === 500) {
                await Swal.fire({
                    position: "center",
                    icon: "error",
                    title: "Đã xảy ra lỗi khi đăng nhập, thử lại sau.",
                    showConfirmButton: false,
                    timer: 1500
                })
            }
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