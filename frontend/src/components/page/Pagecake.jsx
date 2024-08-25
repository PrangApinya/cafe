import React from 'react'
import'./Pagecake.css'
import Cafe from '../cafehead/Cafe'
import cakec from '../../assets/img/cakec.png'
import caketea from '../../assets/img/caketea.png'
import cakes from '../../assets/img/cakes.png'
import cakem from '../../assets/img/cakem.png'


const Pagecake = () => {
  return (
   <div>
        <Cafe/>
            <div class="box2">
                <div class="boxcoffee mt-5">
                    <div class="row"> 
                    <div class="col-sm-4 ">
                        <div class="card" >
                        <img src={cakec} class="card-img-top" height="150"/>
                        <div class="card-body">
                            <h5 class="card-title text-center">latte</h5>
                            <h5 class="card-title text-center">50THB</h5>
                            <div class="d-flex justify-content-center">
                            <a href="#" class="btn btn-primary ">Check out</a>
                            </div>
                        </div>
                        </div>
                    </div>

                    <div class="col-sm-4">
                        <div class="card" >
                        <img src={caketea} class="card-img-top" height="150"/>
                        <div class="card-body">
                            <h5 class="card-title text-center">Cabuchino</h5>
                            <h5 class="card-title text-center">55THB</h5>
                            <div class="d-flex justify-content-center">
                            <a href="#" class="btn btn-primary ">Check out</a>
                            </div>
                        </div>
                        </div>
                    </div>

                    <div class="col-sm-4">
                    <div class="card" >
                        <img src={cakes} class="card-img-top" width="60" height="150"/>
                        <div class="card-body">
                            <h5 class="card-title text-center">Green tea</h5>
                            <h5 class="card-title text-center">55THB</h5>
                            <div class="d-flex justify-content-center">
                            <a href="#" class="btn btn-primary ">Check out</a>
                            </div>
                        </div>
                        </div>
                    </div>

                    <div class="col-sm-4">
                    <div class="card" >
                        <img src={cakem} class="card-img-top" height="150"/>
                        <div class="card-body">
                            <h5 class="card-title text-center">thai tea</h5>
                            <h5 class="card-title text-center">70THB</h5>
                            <div class="d-flex justify-content-center">
                            <a href="#" class="btn btn-primary ">Check out</a>
                            </div>
                        </div>
                        </div>
                    </div>

                    </div>       
                </div>
            </div>

 </div>
    
  )
}

export default Pagecake