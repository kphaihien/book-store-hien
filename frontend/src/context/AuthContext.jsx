import { createContext, useContext, useEffect, useState } from "react";
import { useLoginUserMutation, useRegisterNewUserMutation } from "../redux/features/auth/authApi";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import decodeToken from "../utils/decodeToken"

const AuthContext = createContext()
export const useAuth = () => {
    return useContext(AuthContext)
}

export const AuthProvide = ({ children }) => {
    const navigate = useNavigate()
    const [loginUser, ] = useLoginUserMutation()
    const [loading,setLoading]=useState(true)
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
            const user=await response.user;
            localStorage.setItem('user',JSON.stringify(user));
            localStorage.setItem('token', token);
            setCurrentUser(response.user)
            const tokenPayload=decodeToken(token)
            const expireAt=tokenPayload?.exp *1000 //để đổi ra ms
            localStorage.setItem('expireAt',expireAt)
            const timeout=setTimeout(()=>{
                alert("Phiên đăng nhập đã hết hạn, mời đăng nhập lại!")
                navigate("/login")
                logOut()
            },expireAt-Date.now())

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
            localStorage.removeItem('user')
            localStorage.removeItem('expireAt')
        } catch (error) {
            console.log(error);

        }
    }
    useEffect(()=>{
        const storedUser=JSON.parse(localStorage.getItem('user'))
        const token = localStorage.getItem("token");
        const expireAt = parseInt(localStorage.getItem("expireAt"));
        if (token && expireAt) {
            const timeLeft = expireAt - Date.now();
            if (timeLeft > 0) {
                setTimeout(() => {
                    alert("Phiên đăng nhập đã hết hạn, mời đăng nhập lại.");
                    logOut();
                    navigate("/login")
                }, timeLeft);
            } else {
                logOut();
            }
          }
        if(storedUser){
            setCurrentUser(storedUser)
        }
        setLoading(false)
    },[])

    const value = {
        currentUser,
        registerUser,
        logIn,
        logOut,
        setCurrentUser,
        loading
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}