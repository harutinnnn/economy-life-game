import './App.css'
import './styles/Game.css'
import {Navigate, Route, Routes} from "react-router-dom";
import {useLocation} from "react-router-dom";
import {Header} from "@/components/partial/Header";
import {MainPage} from "@/pages/main.page";
import {AuthPage} from "@/pages/auth.page";
import ActivationCode from "@/pages/ActivationCode";
import ProtectedRoute from "@/components/ProtectedRoute";
import ProtectedLayout from "@/layouts/ProtectedLayout";
import ProtectedAdminLayout from "@/layouts/ProtectedAdminLayout";
import AuthLayout from "@/layouts/AuthLayout";
import {ProfilePage} from "@/pages/profile.page";
import {WorldPage} from "@/pages/world.page";
import {MarketPage} from "@/pages/market.page";
import {AdminMain} from "@/pages/admin/admin.main";
import {useAuth} from "@/hooks/useAuth";
import {UserRoles} from "@/enums/UserRoles";
import {AdminProductCategories} from "@/pages/admin/admin.product.categories";
import {AdminProducts} from "@/pages/admin/admin.products";
import {Toaster} from "react-hot-toast";

function App() {
    const {user} = useAuth();
    const location = useLocation();
    const isAdminRoute = location.pathname.startsWith("/admin");
    const isAdminUser = user?.user.role === UserRoles.SUPERADMIN || user?.user.role === UserRoles.ADMIN;


    return (
        <div className={"wrapper " + (isAdminUser && "admin-wrapper")}>
            {!isAdminRoute && <Header/>}
            <Routes>

                <Route element={<AuthLayout/>}>
                    <Route path="/auth" element={<AuthPage/>}/>
                </Route>

                <Route path="/wrong-activation-code" element={<ActivationCode/>}/>


                <Route
                    element={
                        <ProtectedRoute>
                            <ProtectedLayout/>
                        </ProtectedRoute>
                    }
                >
                    <Route path="/" element={isAdminUser ? <Navigate to="/admin" replace/> : <MainPage/>}/>
                    <Route path="/world" element={<WorldPage/>}/>
                    <Route path="/profile/:tab" element={<ProfilePage/>}/>
                    <Route path="/profile" element={<ProfilePage/>}/>
                    <Route path="/market" element={<MarketPage/>}/>
                </Route>

                <Route
                    element={
                        <ProtectedRoute>
                            <ProtectedAdminLayout/>
                        </ProtectedRoute>
                    }
                >
                    <Route path="/admin" element={isAdminUser ? <AdminMain/> : <Navigate to="/" replace/>}/>

                    <Route path="/admin/product-categories"
                           element={isAdminUser ? <AdminProductCategories/> : <Navigate to="/" replace/>}/>

                    <Route path="/admin/products"
                           element={isAdminUser ? <AdminProducts/> : <Navigate to="/" replace/>}/>
                </Route>


            </Routes>
            <Toaster
                position="top-center"
                reverseOrder={false}
            />


        </div>
    )
}

export default App
