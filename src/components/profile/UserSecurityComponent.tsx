import {useAuth} from "@/hooks/useAuth";


export const UserSecurityComponent = () => {

    const {user, login} = useAuth();





    return (
        <div className={""}>

            <h2 className={"m-b-2"}>Security</h2>

        </div>
    );
};
