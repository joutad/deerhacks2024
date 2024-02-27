import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./views/Layout";
import NoPage from './views/NoPage';
import Login from './views/Login';
import Island from './views/Island';
import Register from './views/Register';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout/>}/>
        {/* <Route index element={<Home />}/> */}
        <Route index element={<Login />}/>
        <Route path='/island' element={<Island/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path="*" element={<NoPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
