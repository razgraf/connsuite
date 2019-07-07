/**
 * Created by @VanSoftware on 2019-07-04.
 */
import React, {Component} from 'react';
import {Switch, Route} from 'react-router-dom';

import Dashboard from "../../Page/Dashboard/Dashboard";
import Networks from "../../Page/Networks/Networks";
import NavUser from "../../Structure/NavUser/NavUser";


class NavigatorUser extends Component{

    render(){
        return (
            <div>
                <NavUser/>

                <Switch>
                    <Route path="/" exact component={Dashboard}/>
                    <Route path="/networks" exact component={Networks}/>
                </Switch>


            </div>
        );
    }
}

export default NavigatorUser;