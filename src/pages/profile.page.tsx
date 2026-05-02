import '../styles/Profile.css'

import {UserInfoComponent} from "@/components/profile/UserInfoComponent";
import {Earth, UserLock, UserRoundCog, UserRoundPen} from "lucide-react";
import {AccountTabNavEnums} from "@/enums/AccountTabNavEnums";
import {useState} from "react";
import {UserProfileComponent} from "@/components/profile/UserProfileComponent";
import {UserSecurityComponent} from "@/components/profile/UserSecurityComponent";
import {UserSettingsComponent} from "@/components/profile/UserSettingsComponent";
import {useParams} from "react-router-dom";

export const ProfilePage = () => {


    const {tab} = useParams();
    const [currentTab, setCurrentTab] = useState<string>(tab || AccountTabNavEnums.INFO);

    const handleSetAccountTab = (tab: string) => {
        setCurrentTab(tab)
    }

    return (
        <div>

            <div className={"user-profiles-nav-tab"}>
                <div
                    onClick={() => handleSetAccountTab(AccountTabNavEnums.INFO)}
                    className={"user-profiles-nav-tab-item " + (currentTab === AccountTabNavEnums.INFO ? 'active' : '')}>
                    <UserRoundPen size={32}/>
                </div>

                <div
                    onClick={() => handleSetAccountTab(AccountTabNavEnums.SECURITY)}
                    className={"user-profiles-nav-tab-item " + (currentTab === AccountTabNavEnums.SECURITY ? 'active' : '')}>
                    <UserLock size={32}/>
                </div>

                <div
                    onClick={() => handleSetAccountTab(AccountTabNavEnums.COUNTRY_TIMEZONE)}
                    className={"user-profiles-nav-tab-item " + (currentTab === AccountTabNavEnums.COUNTRY_TIMEZONE ? 'active' : '')}>
                    <Earth size={32}/>
                </div>

                <div
                    onClick={() => handleSetAccountTab(AccountTabNavEnums.SETTINGS)}
                    className={"user-profiles-nav-tab-item " + (currentTab === AccountTabNavEnums.SETTINGS ? 'active' : '')}>
                    <UserRoundCog size={32}/>
                </div>
            </div>

            <div className="profile-page">

                {currentTab === AccountTabNavEnums.SECURITY && <UserSecurityComponent/>}
                {currentTab === AccountTabNavEnums.COUNTRY_TIMEZONE && <UserInfoComponent/>}
                {currentTab === AccountTabNavEnums.SETTINGS && <UserSettingsComponent/>}
                {currentTab === AccountTabNavEnums.INFO && <UserProfileComponent/>}
            </div>
        </div>
    )
}
