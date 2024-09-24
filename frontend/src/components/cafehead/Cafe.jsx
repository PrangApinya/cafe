import React from "react";
import "./Cafe.css";
import coffeecup from "../../assets/img/coffeecup.png";
import icedcoffee from "../../assets/img/icedcoffee.png";
import cake from "../../assets/img/cake.png";
import harvest from "../../assets/img/harvest.png";

const openNav = () => {
  document.getElementById("myNav").style.display = "block";
};

const closeNav = () => {
  document.getElementById("myNav").style.display = "none";
};
const Cafe = () => {
  return (
    <header>
      <div class="navigation">
        <div class="burger">
          <div id="myNav" className="overlay">
            <a
              href="javascript:void(0)"
              className="closebtn"
              onClick={closeNav}
            >
              ×
            </a>
            <div className="overlay-content">
              <a href="/dashboard">DASHBOARD</a>
              <a href="/staff">STAFF</a>
              <a href="/login">LOGOUT</a>
            </div>
          </div>
          <span style={{ fontSize: 30, cursor: "pointer" }} onClick={openNav}>
            ☰{" "}
          </span>
        </div>

        <div class="image"></div>
      </div>

      <div class="box">
        <div class="boximg">
          <a href="/">
            <img src={coffeecup} alt="" width="60" height="60" />
          </a>
          <a href="/ice">
            <img src={icedcoffee} alt="" width="60" height="60" />
          </a>
          <a href="/cake">
            <img src={cake} alt="" width="60" height="60" />
          </a>
          <a href="cast">
            <img src={harvest} alt="" width="60" height="60" />
          </a>
        </div>
      </div>
    </header>
  );
};

export default Cafe;
