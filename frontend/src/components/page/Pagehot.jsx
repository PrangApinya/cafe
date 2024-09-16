import React from 'react'
import'./Page.css'
import Cafe from '../cafehead/Cafe'
import latte from '../../assets/img/latte.png'
import capo from '../../assets/img/capo.png'
import tea from '../../assets/img/tea.png'
import teat from '../../assets/img/teat.png'

const Pagehot = () => {
    return (
        <div>
        <Cafe/>
            <div class="box2">
                <div class="boxcoffee mt-5">
                    <div class="row">
                        <div class="col-3 ">
                            <div class="card ms-5" >
                                <img src={latte} class="card-img-top"  height="130" />
                                <div class="card-body">
                                    <h4>latte</h4>
                                    <h5>40THB</h5>                                
                                    <button class="btn btn-primary" onclick="window.location.href='#';">Check out</button>
                                </div>                                                       
                            </div>
                        </div>

                        <div class="col-3">
                            <div class="card ms-5" >
                                <img src={capo} class="card-img-top" height="130" />
                                <div class="card-body">
                                    <h4>Cappuccino</h4>
                                    <h5>45THB</h5>
                                    <button class="btn btn-primary" onclick="window.location.href='#';">Check out</button>
                                </div>
                            </div>
                        </div>

                        <div class="col-3">
                            <div class="card ms-5" >
                                <img src={tea} class="card-img-top"   height="125" />
                                <div class="card-body">
                                    <h4 >Green tea</h4>
                                    <h5>30THB</h5>
                                    <button class="btn btn-primary" onclick="window.location.href='#';">Check out</button>
                                </div>
                            </div>
                        </div>

                        <div class="col-3">
                            <div class="card ms-5" >
                                <img src={teat} class="card-img-top"  height="130" />
                                <div class="card-body">
                                    <h4>thai tea</h4>
                                    <h5>30THB</h5>
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

export default Pagehot