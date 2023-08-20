import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import User from './pages/User';
import Manufacturer from './pages/Manufacturer';
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import Dashboard from './pages/Dashboard';
import DrugUpload from './pages/DrugUpload';
import ViewAll from './pages/ViewAllUploaded';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Home />} />     
        <Route exact path="/user-search" element={<User />} />   
        <Route exact path="/manufacturer-login" element={<Manufacturer />} />
        <Route exact path="/sign-up" element={<SignUp />} />
        <Route exact path="/sign-in" element={<SignIn />} />
        <Route exact path="/dashboard" element={<Dashboard />} />
        <Route exact path="/drug-upload" element={<DrugUpload />} />
        <Route exact path="/view-all-drugs" element={<ViewAll />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
