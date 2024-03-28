import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./views/Routing/Layout";
import Home from "./views/Home";
import Login from "./views/Login";
import Register from "./views/Register";
import NoPage from "./views/NoPage";
import Classrooms from "./components/Classrooms";
import CreateClassroom from "./components/CreateClassroom";
import ClassComponent from "./components/ClassComponent";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout/>}>
                    <Route index element={<Home/>}/>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/register" element={<Register/>}/>
                    <Route path="/classrooms" element={<Classrooms/>}/>
                    <Route path="/createClassroom" element={<CreateClassroom/>}/>
                    <Route path="/classrooms/class/:id" element={<ClassComponent />} />
                    <Route path="*" element={<NoPage />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;