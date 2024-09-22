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
                                    <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                                    Add menu </button>
                                </div>
                            </div>
                        </div> 

                        <div className="col-3">
                            <div className="card ms-5">
                                <img src={capo} className="card-img-top" height="130" />
                                <div className="card-body">
                                    <h4>Cappuccino</h4>
                                    <h5>45THB</h5>
                                    <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                                    Add menu </button>
                                </div>
                            </div>
                        </div>

                        <div className="col-3">
                            <div className="card ms-5">
                                <img src={tea} className="card-img-top" height="125" />
                                <div className="card-body">
                                    <h4>Green tea</h4>
                                    <h5>30THB</h5>
                                    <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                                    Add menu </button>
                                </div>
                            </div>
                        </div>

                        <div className="col-3">
                            <div className="card ms-5">
                                <img src={teat} className="card-img-top" height="130" />
                                <div className="card-body">
                                    <h4>thai tea</h4>
                                    <h5>30THB</h5>
                                    <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                                    Add menu </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h1 className="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            
                            <div class="dropdown">
                            <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                            sweetness
                            </button>
                            <ul class="dropdown-menu">
                                <li><a class="dropdown-item" href="#">Less sweet</a></li>
                                <li><a class="dropdown-item" href="#">Normal sweet</a></li>
                                <li><a class="dropdown-item" href="#">Very sweet</a></li>
                            </ul>
                            </div>
                            <div class="dropdown">
                            <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                            topping
                            </button>
                            <ul class="dropdown-menu">
                                <li><a class="dropdown-item" href="#">whipped cream</a></li>
                                
                            </ul>
                            </div>

                    
                        
                            <div className="modal-footer">
                                <button type="button" className="btn btn-primary">Add menu</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Pagehot