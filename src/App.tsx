import './App.css'
import {Route, Routes} from "react-router-dom";
import {MainPage} from "./pages/main.page.tsx";
import {Header} from "./components/partial/Header.tsx";

function App() {

    return (
        <div className="wrapper">
            <Header/>
            <Routes>

                <Route path="/" element={<MainPage/>}/>

            </Routes>
        </div>
    )
}

export default App
