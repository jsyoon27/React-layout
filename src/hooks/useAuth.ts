import { login, resetPassword, resetRequest, signup } from "@/api/auth.api";
import { LoginProps } from "@/pages/Login";
import { useAuthStore } from "@/store/authStore";
import { useAlert } from "./useAlert";
import { data, useNavigate } from "react-router-dom";
import { SignupProps } from "@/pages/Signup";
import { useState } from "react";

export const useAuth = () => {
    const { showAlert } = useAlert();
    const navigate = useNavigate();

    //상태
    const { isloggedIn, storeLogin, storeLogout} = useAuthStore();

    //메소드
    const userLogin = (data: LoginProps) => {
        login(data).then((res)=> {

            // 상태 변화
            storeLogin(res.token);

            showAlert('로그인이 완료되었습니다.')
            navigate('/');
            }, (error) => {
            showAlert('로그인에 실패했습니다.');
        });
    };
    const userSignup = (data: SignupProps) => {
        signup(data).then((res)=> {
            showAlert('회원가입이 완료되었습니다.')
            navigate('/login');
        })
    }
    const userResetPassword = (data: SignupProps) => {
        resetPassword(data).then(() => {
        showAlert('비밀번호 초기화되었습니다.')
        navigate('/login');
        })
    }
    const [resetRequested, setResetRequested] = useState(false);

    const userResetRequest = (data: SignupProps) => {
        resetRequest(data).then(() => {
        setResetRequested(true);
        })
    }
    
    //리턴
    return { userLogin, userSignup,userResetPassword, userResetRequest,resetRequested}
}