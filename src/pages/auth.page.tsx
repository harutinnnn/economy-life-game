import '../styles/Auth.css'
import {LoginComponent} from "@/components/auth/login.component";
import {ForgotComponent} from "@/components/auth/forgot.component";
import {RegisterComponent} from "@/components/auth/register.component";
import {useEffect, useState} from "react";
import {AuthFormTypeEnum} from "@/enums/AuthFormTypeEnum";
import {useAuth} from "@/hooks/useAuth";
import {useNavigate} from "react-router-dom";

export const AuthPage = () => {

    const {user} = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            navigate("/");
        }
    }, [user]);

    const checkTypeAndSetCOmponent = (type: string) => {
        switch (type) {
            case AuthFormTypeEnum.login:
                setShowForm(<LoginComponent cb={(type) => checkTypeAndSetCOmponent(type)}/>)
                break;
            case AuthFormTypeEnum.forgot_password:
                setShowForm(<ForgotComponent cb={(type) => checkTypeAndSetCOmponent(type)}/>)
                break;
            case AuthFormTypeEnum.registration:
                setShowForm(<RegisterComponent cb={(type) => checkTypeAndSetCOmponent(type)}/>)
                break;
        }

    }
    const [showForm, setShowForm] = useState(<LoginComponent cb={(type) => checkTypeAndSetCOmponent(type)}/>);


    return (
        <div className="auth-page">

            <div className="auth-form-container">
                {showForm}
            </div>

            <div className="text-notice finger-paint-regular m-t-3 b-shadow">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium ad, dolor eius eveniet fugiat iste
                quisquam rerum soluta. Aliquid, illum?
            </div>

        </div>
    )
}