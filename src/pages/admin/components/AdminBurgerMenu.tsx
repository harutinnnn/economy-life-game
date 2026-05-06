import {useState} from "react";
import {Link, useLocation} from "react-router-dom";
import {getUrlPart} from "@/utils/url.helper";
import {useAuth} from "@/hooks/useAuth";

export const AdminBurgerMenu = () => {

    const location = useLocation();

    const pageUrl: string = getUrlPart(location.pathname, 1)

    const [showHideMenu, setShowHideMenu] = useState(false);
    const {logout} = useAuth()

    return (
        <div className={'burger-menu'}>

            <div className="burger" onClick={() => setShowHideMenu(!showHideMenu)}>
                <div></div>
                <div></div>
                <div></div>
            </div>


            <div className={"admin-nav " + (showHideMenu ? "show" : "")}>
                <ul>
                    <li>
                        <Link to={'/admin'} className={pageUrl === undefined ? 'active' : ''}>
                            Dashboard
                        </Link>
                    </li>
                    <li>
                        <Link to={'/admin/product-categories'}
                              className={pageUrl === 'product-categories' ? 'active' : ''}>
                            Product Categories
                        </Link>
                    </li>
                    <li>
                        <Link to={'/admin/products'}
                              className={pageUrl === 'products' ? 'active' : ''}>
                            Products
                        </Link>
                    </li>
                    <li>
                        <a onClick={logout}>Log Out</a>
                    </li>
                </ul>
            </div>
        </div>
    )
}