import {Outlet, useLocation} from "react-router-dom";
import {useEffect} from "react";
import {socket, reconnectSocketWithFreshToken} from "@/socket";
import {useAuth} from "@/hooks/useAuth";
import {FooterTabNav} from "@/components/partial/FooterTabNav";
import {getUrlPart} from "@/utils/url.helper";

export type ProtectedLayoutContext = {
    socket: typeof socket;
};

export default function ProtectedLayout() {
    const {user} = useAuth();

    const location = useLocation();

    const pageUrl: string = getUrlPart(location.pathname, 0)

    useEffect(() => {
        if (!user) {
            socket.disconnect();
            return;
        }

        reconnectSocketWithFreshToken();

        return () => {
            socket.disconnect();
        };
    }, [user]);


    return (
        <>
            <Outlet context={{socket}}/>
            <FooterTabNav activeTabArg={pageUrl}/>
        </>
    );
}
