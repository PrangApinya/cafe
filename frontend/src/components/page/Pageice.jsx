import React from 'react'
import'./Page.css'
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

                        <div class="col-sm-3 ">
                            <div class="card ms-5" >
                            <img src={latteice} class="card-img-top" width="170" height="160"/>
                            <div class="card-body">
                                <h4>latte</h4>
                                <h5>50THB</h5>
                                <button class="btn btn-primary" onclick="window.location.href='#';">Check out</button>
                            </div>
                            </div>
                        </div>

                        <div class="col-sm-3">
                            <div class="card ms-5" >
                            <img src={capoice} class="card-img-top" width="180" height="150"/>
                            <div class="card-body">
                                <h4>Cappuccino</h4>
                                <h5>50THB</h5>
                                <button class="btn btn-primary" onclick="window.location.href='#';">Check out</button>
                            </div>
                            </div>
                        </div>

                        <div class="col-sm-3">
                            <div class="card ms-5" >
                                <img src={gteaice} class="card-img-top" width="170" height="160"/>
                                <div class="card-body">
                                    <h4>Green tea</h4>
                                    <h5>50THB</h5>
                                    <button class="btn btn-primary" onclick="window.location.href='#';">Check out</button>
                                </div>
                                </div>
                        </div>

                        <div class="col-sm-3">
                        <div class="card  ms-5" >
                                <img src={teaice} class="card-img-top"width="170" height="160"/>
                                <div class="card-body">
                                    <h4>thai tea</h4>
                                    <h5>50THB</h5>
                                    <button class="btn btn-primary" onclick="window.location.href='#';">Check out</button>
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