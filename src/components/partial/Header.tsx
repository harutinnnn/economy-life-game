import {useNavigate} from "react-router-dom";
import {useAuth} from "@/hooks/useAuth";

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
                            <div className={"notifications-info"}>
                                <img src="/images/icons/bell.png" alt=""/>
                                <div className="badge">2</div>
                            </div>

                            <img src="/images/icons/play.png" className={'auth-btn'} alt=""
                                 onClick={() => navigate('/')}/>
                            <img src="/images/icons/logout.png" alt="" className={"auth-btn"}
                                 onClick={() => logout()}/>
                        </>
                    }
                </div>
            </div>

            <div className="header-user-info">
                <div className="money-info">
                    <img src="/images/icons/game-money.png" alt=""/>
                    <span>{user?.user?.gameMoney || 0}</span>
                    <img src="/images/icons/add-icon.png" className={"add-icon"} alt="" onClick={() => {
                        console.log("Add user game money")
                    }}/>
                </div>

                <div className="money-info">
                    <img src="/images/icons/real-money.png" alt=""/>
                    <span>{user?.user?.realMoney || 0}</span>
                    <img src="/images/icons/add-icon.png" className={"add-icon"} alt=""
                         onClick={() => {
                             console.log("Add user real money")
                         }}
                    />
                </div>

                <div className="money-info">
                    <img src="/images/icons/hunger.png" alt=""/>
                    <span>{user?.userProgressInfo?.hunger || 0}%</span>
                    <img src="/images/icons/add-icon.png" className={"add-icon"} alt=""
                         onClick={() => {
                             console.log("Add user real money")
                         }}
                    />
                </div>

                <div className="money-info">
                    <img src="/images/icons/energy.png" alt=""/>
                    <span>{user?.userProgressInfo?.energy || 0}</span>
                    <img src="/images/icons/add-icon.png" className={"add-icon"} alt=""
                         onClick={() => {
                             console.log("Add user real money")
                         }}
                    />
                </div>
            </div>

        </header>
    )
}