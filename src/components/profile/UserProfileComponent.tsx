import {useAuth} from "@/hooks/useAuth";


export const UserProfileComponent = () => {

    const {user, login} = useAuth();





    return (
        <div className={""}>

            <h2 className={"m-b-2"}>User profile</h2>

        </div>
    );
};
