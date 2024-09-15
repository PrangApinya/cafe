import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Cafe from './components/cafehead/Cafe'

import Pagehot from './components/page/Pagehot';
import Pageice from './components/page/Pageice';
import Pagecake from './components/page/Pagecake';
import Pagecast from './components/page/Pagecast';

import PageDashboard from './components/page/PageDashboard';

import Register from './components/register/Register';
import Home from './components/cafehead/Home';
import Login from './components/login/Login';
import Pagestaff from './components/page/Pagestaff';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Pagehot />} />
        <Route path='/home' element={<Home/>} /> 
        <Route path="/ice" element={<Pageice />} />
        <Route path="/cake" element={<Pagecake />} />
        <Route path="/cast" element={<Pagecast />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login/>}/>
        <Route path="/dashboard" element={<PageDashboard/>} />
        <Route path="/staff" element={<Pagestaff/>} />
      </Routes>
    </Router>

  )
}

export default App
