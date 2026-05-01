import {Outlet, useLocation} from "react-router-dom";
import {useEffect, useState} from "react";
import {getNotifications, NotificationsResponse} from "@/api/notifications.api";
import {socket, reconnectSocketWithFreshToken} from "@/socket";
import {useAuth} from "@/hooks/useAuth";
import {FooterTabNav} from "@/components/partial/FooterTabNav";
import {TabNavEnums} from "@/enums/TabNavEnums";
import {getUrlPart} from "@/utils/url.helper";

export type ProtectedLayoutContext = {
    socket: typeof socket;
};

export default function ProtectedLayout() {
    const [minMaxSidebar, setMinMaxSidebar] = useState<boolean>(false);
    const {user} = useAuth();

    const [notifications, setNotifications] = useState<NotificationsResponse[]>([]);

    const getNotificationsHandle = async (): Promise<void> => {
        const notifications = await getNotifications()
        setNotifications(notifications as NotificationsResponse[]);
    }

    const location = useLocation();

    const pageUrl: string = getUrlPart(location.pathname, 0)

    useEffect(() => {
        (async () => {
            try {
                // getNotificationsHandle()

            } catch (err) {
                console.error(err);
            }
        })()

    }, [setNotifications]);

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
