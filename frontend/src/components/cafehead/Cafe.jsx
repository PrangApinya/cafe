import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/Auth'
import './Cafe.css'
import coffeecup from '../../assets/img/coffeecup.png'
import icedcoffee from '../../assets/img/icedcoffee.png'
import cake from '../../assets/img/cake.png'
import harvest from '../../assets/img/harvest.png'

const openNav = () => {
  document.getElementById("myNav").style.display = "block";
};

const closeNav = () => {
  document.getElementById("myNav").style.display = "none";
};

// The component for the sidebar and the navigation bar
const Cafe = () => {
  const { isAuthenticated, logout } = useAuth();


  return (
    <header>
      <div className="navigation">
        <div className="burger">
          <div id="myNav" className="overlay">
            <Link to="javascript:void(0)" className="closebtn" onClick={closeNav}>×</Link>
            <div className="overlay-content">
              <Link to="/dashboard">DASHBOARD</Link>
              <Link to="/attendance">ATTENDANCE</Link>
              <Link to="/staff">STAFF</Link>
              {isAuthenticated ? (
                <Link to="/login" onClick={logout}>LOGOUT</Link>
              ) : (
                <Link to="/login">LOGIN</Link>
              )}
            </div>
          </div>
          <span style={{ fontSize: 30, cursor: 'pointer' }} onClick={openNav}>☰ </span>
        </div>

        <div className="image">
        </div>
      </div>

      <div className="box">
        <div className="boximg">
          <a href="/"><img src={coffeecup} alt="" width="60" height="60" /></a>
          <a href="/ice"><img src={icedcoffee} alt="" width="60" height="60" /></a>
          <a href="/cake"><img src={cake} alt="" width="60" height="60" /></a>
          <a href="cast"><img src={harvest} alt="" width="60" height="60" /></a>
        </div>
      </div>
    </header>
  )

}


export default Cafe