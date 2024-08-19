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
                                    <img src={latte} class="card-img-top" height="150" />
                                    <div class="card-body">
                                        <h5 class="card-title text-center">latte</h5>
                                        <h5 class="card-title text-center">40THB</h5>
                                        <div class="d-flex justify-content-center">
                                            <a href="#" class="btn btn-primary ">Check out</a>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="col-sm-4">
                                <div class="card" >
                                    <img src={capo} class="card-img-top" height="150" />
                                    <div class="card-body">
                                        <h5 class="card-title text-center">Cabuchino</h5>
                                        <h5 class="card-title text-center">45THB</h5>
                                        <div class="d-flex justify-content-center">
                                            <a href="#" class="btn btn-primary ">Check out</a>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="col-sm-4">
                                <div class="card" >
                                    <img src={tea} class="card-img-top"  height="150" />
                                    <div class="card-body">
                                        <h5 class="card-title text-center">Green tea</h5>
                                        <h5 class="card-title text-center">30THB</h5>
                                        <div class="d-flex justify-content-center">
                                            <a href="#" class="btn btn-primary ">Check out</a>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="col-sm-4">
                                <div class="card" >
                                    <img src={teat} class="card-img-top"  />
                                    <div class="card-body">
                                        <h5 class="card-title text-center">thai tea</h5>
                                        <h5 class="card-title text-center">30THB</h5>
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

export default Pagehot