import {useAuth} from "@/hooks/useAuth";


export const UserSettingsComponent = () => {

    const {user, login} = useAuth();





    return (
        <div className={""}>

            <h2 className={"m-b-2"}>Settings</h2>

        </div>
    );
};
