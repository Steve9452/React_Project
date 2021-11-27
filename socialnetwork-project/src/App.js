import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Login from './pages/Login/Login';
import User from './pages/User/User';
import Admin from './pages/Admin/Admin';
import RedirectUser from './pages/Redirect/RedirectUser';
import NotFound from './pages/NotFound/NotFound'

import Private from './Components/PrivateRoute/PrivateRoute'

function App() {
  return (
    <BrowserRouter>
      <Routes>        
        <Route path="/login" element={<Login />} />
        <Route path="/redirect" element={<RedirectUser />}/>
        
        <Route path="/admin"  element={<Private role="admin"><Admin /></Private>} />
        <Route path="/user"   element={<Private role="user"> <User /> </Private>} />
        
        <Route path="*" element={<NotFound />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
