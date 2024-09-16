import React from 'react'
import './Pagehot.css'
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
                        <div class="col-sm-4 ">
                            <div class="card" >
                                <img src={latte} class="card-img-top" width="160" height="130" />
                                <div class="card-body">
                                    <h4>latte</h4>
                                    <h5>40THB</h5>                                
                                    <button class="btn btn-primary" onclick="window.location.href='#';">Check out</button>
                                </div>                                                       
                            </div>
                        </div>

                        <div class="col-sm-4">
                            <div class="card" >
                                <img src={capo} class="card-img-top"width="160" height="130" />
                                <div class="card-body">
                                    <h4>Cappuccino</h4>
                                    <h5>45THB</h5>
                                    <button class="btn btn-primary" onclick="window.location.href='#';">Check out</button>
                                </div>
                            </div>
                        </div>

                        <div class="col-sm-4">
                            <div class="card" >
                                <img src={tea} class="card-img-top" width="155"  height="125" />
                                <div class="card-body">
                                    <h4>Green tea</h4>
                                    <h5>30THB</h5>
                                    <button class="btn btn-primary" onclick="window.location.href='#';">Check out</button>
                                </div>
                            </div>
                        </div>

                        <div class="col-sm-4">
                            <div class="card" >
                                <img src={teat} class="card-img-top" width="170" height="130" />
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