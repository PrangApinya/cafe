import React from 'react'
import './Page.css'
import Cafe from '../cafehead/Cafe'
import latte from '../../assets/img/latte.png'
import capo from '../../assets/img/capo.png'
import tea from '../../assets/img/tea.png'
import teat from '../../assets/img/teat.png'

const Pagehot = () => {
   

    return (
        <div>
            <Cafe />
            <div className="box2">
                <div className="boxcoffee mt-5">
                    <div className="row">
                        <div className="col-3">
                            <div className="card ms-5">
                                <img src={latte} className="card-img-top" height="130" />
                                <div className="card-body">
                                    <h4>latte</h4>
                                    <h5>40THB</h5>
                                    <button class="btn btn-primary" onclick="window.location.href='#';"><h5>Add menu</h5></button>
                                </div>
                            </div>
                        </div>

                        <div className="col-3">
                            <div className="card ms-5">
                                <img src={capo} className="card-img-top" height="130" />
                                <div className="card-body">
                                    <h4>Cappuccino</h4>
                                    <h5>45THB</h5>
                                    <button class="btn btn-primary" onclick="window.location.href='#';"><h5>Add menu</h5></button>
                                </div>
                            </div>
                        </div>

                        <div className="col-3">
                            <div className="card ms-5">
                                <img src={tea} className="card-img-top" height="125" />
                                <div className="card-body">
                                    <h4>Green tea</h4>
                                    <h5>30THB</h5>
                                    <button class="btn btn-primary" onclick="window.location.href='#';"><h5>Add menu</h5></button>
                                </div>
                            </div>
                        </div>

                        <div className="col-3">
                            <div className="card ms-5">
                                <img src={teat} className="card-img-top" height="130" />
                                <div className="card-body">
                                    <h4>thai tea</h4>
                                    <h5>30THB</h5>
                                    <button class="btn btn-primary" onclick="window.location.href='#';"><h5>Add menu</h5></button>
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