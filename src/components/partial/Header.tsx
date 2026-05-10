import {useNavigate} from "react-router-dom";
import {useAuth} from "@/hooks/useAuth";
import {userUpToNextLvlByPercent} from "@/helpers/userHelper";

export const Header = () => {
    const navigate = useNavigate();
    const {user, logout} = useAuth()


    return (
        <header>
            <div className="header-container">
                <img src="/images/logo.png" className="logo" alt="Make live" onClick={() => navigate('/')}/>
                <h1 className="title nowrap">
                    Make live
                </h1>

                <div className="auth-actions">
                    {user &&
                        <>
                            <div className={"user-level-info"}>
                                LVL {user.user.level}
                            </div>
                            <div className={"notifications-info"}>
                                <img src="/images/icons/notification.png" alt=""/>
                                <div className="badge">2</div>
                            </div>

                            <img src="/images/icons/logout.png" alt="" className={"auth-btn"}
                                 onClick={() => logout()}/>
                        </>
                    }
                </div>
            </div>
            <div className={'user-experience-progress'}>
                <div className="user-experience-progress-bar"
                     style={{width: (userUpToNextLvlByPercent(Number(user?.user.level), Number(user?.user.xp))) + '%'}}>
                    <span>{(userUpToNextLvlByPercent(Number(user?.user.level), Number(user?.user.xp))) + '%'}</span>
                </div>
            </div>

        </header>
    )
}