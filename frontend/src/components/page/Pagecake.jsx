import React from 'react'
import'./Page.css'
import Cafe from '../cafehead/Cafe'
import cakec from '../../assets/img/cakec.png'
import caketea from '../../assets/img/caketea.png'
import cakes from '../../assets/img/cakes.png'
import cakem from '../../assets/img/cakem.png'


const Pagecake = () => {
    return (
        <div>
            <Cafe />
            <div class="box2">
                <div class="boxcoffee mt-5">
                    <div class="row">
                        <div class="col-sm-3 ">
                            <div class="card ms-5" >
                                <img src={cakec} class="card-img-top" width="160" height="150" />
                                <div class="card-body">
                                    <h4>Chocolate </h4>
                                    <h5>50THB</h5>
                                    <button class="btn btn-primary" onclick="window.location.href='#';"><h5>Add menu</h5></button>
                                </div>
                            </div>
                        </div>

                        <div class="col-sm-3">
                            <div class="card ms-5" >
                                <img src={caketea} class="card-img-top" width="160" height="150" />
                                <div class="card-body">
                                    <h4>Green Tea </h4>
                                    <h5>55THB</h5>
                                    <button class="btn btn-primary" onclick="window.location.href='#';"><h5>Add menu</h5></button>
                                </div>
                            </div>
                        </div>

                        <div class="col-sm-3">
                            <div class="card ms-5" >
                                <img src={cakes} class="card-img-top" width="170" height="150" />
                                <div class="card-body">
                                    <h4>Strawberry </h4>
                                    <h5>55THB</h5>
                                    <button class="btn btn-primary" onclick="window.location.href='#';"><h5>Add menu</h5></button>
                                </div>
                            </div>
                        </div>

                        <div class="col-sm-3">
                            <div class="card ms-5 " >
                                <img src={cakem} class="card-img-top" width="170" height="150" />
                                <div class="card-body">
                                    <h4>Macaron</h4>
                                    <h5>70THB</h5>
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

export default Pagecake