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
                                <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                                    Add menu </button>
                            </div>
                            </div>
                        </div>

                        <div class="col-sm-3">
                            <div class="card ms-5" >
                            <img src={capoice} class="card-img-top" width="180" height="150"/>
                            <div class="card-body">
                                <h4>Cappuccino</h4>
                                <h5>50THB</h5>
                                <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                                    Add menu </button>
                            </div>
                            </div>
                        </div>

                        <div class="col-sm-3">
                            <div class="card ms-5" >
                                <img src={gteaice} class="card-img-top" width="170" height="160"/>
                                <div class="card-body">
                                    <h4>Green tea</h4>
                                    <h5>50THB</h5>
                                    <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                                    Add menu </button>
                                </div>
                                </div>
                        </div>

                        <div class="col-sm-3">
                        <div class="card  ms-5" >
                                <img src={teaice} class="card-img-top"width="170" height="160"/>
                                <div class="card-body">
                                    <h4>thai tea</h4>
                                    <h5>50THB</h5>
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
                                <li><a class="dropdown-item" href="#">boba</a></li>
                                <li><a class="dropdown-item" href="#"> jelly</a></li>
                                <li><a class="dropdown-item" href="#">Konjac</a></li>
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

export default Pageice