import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import User from './pages/User';
import Manufacturer from './pages/Manufacturer';
import SignUp from './pages/SignUp';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Home />} />     
        <Route exact path="/user-search" element={<User />} />   
        <Route exact path="/manufacturer-login" element={<Manufacturer />} />
        <Route exact path="/sign-up" element={<SignUp />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
