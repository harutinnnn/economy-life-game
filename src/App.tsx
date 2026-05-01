import './App.css'
import {Route, Routes, useNavigate} from "react-router-dom";
import {Header} from "@/components/partial/Header";
import {MainPage} from "@/pages/main.page";
import {AuthPage} from "@/pages/auth.page";
import ActivationCode from "@/pages/ActivationCode";
import ProtectedRoute from "@/components/ProtectedRoute";
import ProtectedLayout from "@/layouts/ProtectedLayout";
import AuthLayout from "@/layouts/AuthLayout";
import {useAuth} from "@/hooks/useAuth";
import {useEffect} from "react";
import {ProfilePage} from "@/pages/profile.page";

function App() {


    return (
        <div className="wrapper">
            <Header/>
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
                    <Route path="/" element={<MainPage/>}/>
                    <Route path="/profile" element={<ProfilePage/>}/>


                </Route>

            </Routes>


        </div>
    )
}

export default App
