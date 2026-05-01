import {useNavigate} from "react-router-dom";
import {useAuth} from "@/hooks/useAuth";

export const Header = () => {
    const navigate = useNavigate();
    const {user, logout} = useAuth()

    return (
        <header>
            <img src="/public/images/logo.png" className="logo" alt="Make live" onClick={() => navigate('/')}/>
            <h1 className="title nowrap">
                Make live
            </h1>

            <div className="auth-actions">
                {user &&
                    <>
                        <img src="/public/images/icons/play.png" className={'auth-btn'} alt=""
                             onClick={() => navigate('/')}/>
                        <img src="/public/images/icons/logout.png" alt="" className={"auth-btn"}
                             onClick={() => logout()}/>
                    </>

                }
            </div>

        </header>
    )
}