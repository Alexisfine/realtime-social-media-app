import Home from "./pages/home/Home";
import Profile from "./pages/profile/Profile";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import {useContext} from "react";
import {AuthContext} from "./context/AuthContext";
import Messenger from "./pages/messenger/Messenger";

function App() {
    const {user} = useContext(AuthContext);
  return (
      <BrowserRouter>
          <Routes>
              <Route path='/' element={user? <Home/> : <Login/>}/>
              <Route path='/login' element={user ? <Navigate to='/'/> : <Login/>}/>
              <Route path='/register' element={user ? <Navigate to='/'/> : <Register/>}/>
              <Route path='/profile/:username' element={<Profile/>}/>
              <Route path='/messenger' element={!user ? <Navigate to='/login'/> : <Messenger/>}/>

          </Routes>
      </BrowserRouter>
  );
}



export default App;
