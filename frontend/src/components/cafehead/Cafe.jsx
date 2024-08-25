import React from 'react'
import './Cafe.css'
import logo from '../../assets/img/logo.png'
import coffeecup from '../../assets/img/coffeecup.png'
import icedcoffee from '../../assets/img/icedcoffee.png'
import cake from '../../assets/img/cake.png'
import harvest from '../../assets/img/harvest.png'

const Cafe = () => {
  return (
    <header>
      <div class="navigation">
      <nav class="main-header navbar navbar-expand navbar-white navbar-light">
  
    <ul class="navbar-nav">
      <li class="nav-item">
        <a class="nav-link" data-widget="pushmenu" href="#" role="button"><i class="fas fa-bars"></i></a>
      </li>
     
    </ul>
    </nav>
            
             
             <div class="image">
        </div> 
           </div>

           <div class="box">
          <div class="boximg">
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