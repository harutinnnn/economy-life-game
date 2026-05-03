import {BriefcaseBusiness, ChartBarBig, Globe, House, Store, UserRound} from "lucide-react";
import {useState} from "react";
import {TabNavEnums} from "@/enums/TabNavEnums";
import {useNavigate} from "react-router-dom";

export const FooterTabNav = ({activeTabArg}: { activeTabArg: string }) => {

    const [activeTab, setActiveTab] = useState<string>(activeTabArg.length ? activeTabArg : TabNavEnums.HOME);
    const navigate = useNavigate();

    return (
        <div className={"footer-tab-nav"}>

            <div className={"tab-nav-item " + (activeTab == TabNavEnums.HOME ? "active" : "")}

                 onClick={() => {
                     navigate('/')
                     setActiveTab(TabNavEnums.HOME)
                 }
                 }>
                <House size={32}/>
            </div>
            <div className={"tab-nav-item " + (activeTab == TabNavEnums.WORLD ? "active" : "")}

                 onClick={() => {
                     navigate('/world')
                     setActiveTab(TabNavEnums.WORLD)
                 }
                 }>
                <Globe size={32}/>
            </div>
            <div className={"tab-nav-item " + (activeTab == TabNavEnums.STATS ? "active" : "")}
                 onClick={() => setActiveTab(TabNavEnums.STATS)}>
                <ChartBarBig size={32}/>
            </div>
            <div className={"tab-nav-item " + (activeTab == TabNavEnums.CARRIER ? "active" : "")}
                 onClick={() => setActiveTab(TabNavEnums.CARRIER)}>
                <BriefcaseBusiness size={32}/>
            </div>
            <div className={"tab-nav-item " + (activeTab == TabNavEnums.MARKET ? "active" : "")}
                 onClick={() => setActiveTab(TabNavEnums.MARKET)}>
                <Store size={32}/>
            </div>
            <div className={"tab-nav-item " + (activeTab == TabNavEnums.PROFILE ? "active" : "")}
                 onClick={() => {
                     navigate('/profile')
                     setActiveTab(TabNavEnums.PROFILE)
                 }
                 }>
                <UserRound size={32}/>
            </div>

        </div>
    );

}
