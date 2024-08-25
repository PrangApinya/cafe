import React from 'react'
import'./Pageice.css'
import Cafe from '../cafehead/Cafe'
import latteice from '../../assets/img/latteice.png'
import capoice from '../../assets/img/capoice.png'
import gteaice from '../../assets/img/gteaice.png'
import teaice from '../../assets/img/teaice.png'
const Pageice = () => {
  return (
    <div>
        <Cafe/>
            <div class="box2">
                <div class="boxcoffee mt-5">
                    <div class="row"> 

                        <div class="col-sm-4 ">
                            <div class="card" >
                            <img src={latteice} class="card-img-top" height="170"/>
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
                            <img src={capoice} class="card-img-top" height="170"/>
                            <div class="card-body">
                                <h5 class="card-title text-center">Cappuccino</h5>
                                <h5 class="card-title text-center">50THB</h5>
                                <div class="d-flex justify-content-center">
                                <a href="#" class="btn btn-primary ">Check out</a>
                                </div>
                            </div>
                            </div>
                        </div>

                        <div class="col-sm-4">
                            <div class="card" >
                                <img src={gteaice} class="card-img-top"  height="170"/>
                                <div class="card-body">
                                    <h5 class="card-title text-center">Green tea</h5>
                                    <h5 class="card-title text-center">50THB</h5>
                                    <div class="d-flex justify-content-center">
                                    <a href="#" class="btn btn-primary ">Check out</a>
                                    </div>
                                </div>
                                </div>
                        </div>

                        <div class="col-sm-4">
                        <div class="card" >
                                <img src={teaice} class="card-img-top" height="170"/>
                                <div class="card-body">
                                    <h5 class="card-title text-center">thai tea</h5>
                                    <h5 class="card-title text-center">50THB</h5>
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

export default Pageice