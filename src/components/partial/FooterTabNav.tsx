import {BriefcaseBusiness, ChartBarBig, Globe, Store, UserRound} from "lucide-react";
import {useState} from "react";
import {TabNavEnums} from "@/enums/TabNavEnums";

export const FooterTabNav = () => {

    const [activeTab, setActiveTab] = useState<TabNavEnums>(TabNavEnums.WORLD);

    return (
        <div className={"footer-tab-nav"}>

            <div className={"tab-nav-item " + (activeTab == TabNavEnums.WORLD ? "active" : "")}
                 onClick={() => setActiveTab(TabNavEnums.WORLD)}>
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
                 onClick={() => setActiveTab(TabNavEnums.PROFILE)}>
                <UserRound size={32}/>
            </div>

        </div>
    );

}