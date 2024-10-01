import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Pagehot from './components/page/Pagehot';
import Pageice from './components/page/Pageice';
import Pagecake from './components/page/Pagecake';

import Pagemenu from './components/page/Pagemenu';
import Pagecast from './components/page/Pagecast';
import PageDashboard from './components/page/PageDashboard';

import Register from './components/register/Register';
import Login from './components/login/Login';
import Pagestaff from './components/page/Pagestaff';
import PageAttendance from './components/page/PageAttendance';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Pagehot />} />

        <Route path="/ice" element={<Pageice />} />
        <Route path="/cake" element={<Pagecake />} />
        <Route path="/:menu_id" element={<Pagemenu />} />
        <Route path="/cast" element={<Pagecast />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login/>}/>
        <Route path="/dashboard" element={<PageDashboard/>} />
        <Route path="/staff" element={<Pagestaff/>} />
        <Route path="/attendance" element={<PageAttendance/>} />
      </Routes>
    </Router>
  )
}
export default App
