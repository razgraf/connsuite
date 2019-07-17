/**
 * Created by @VanSoftware on 2019-07-04.
 */
import React, {Component} from 'react';
import {Switch, Route} from 'react-router-dom';

import Dashboard from "../../Page/Dashboard/Dashboard";
import Portfolio from "../../Page/Portfolio/Portfolio";
import NavUser from "../../Structure/NavUser/NavUser";
import NetworkManagerAdd from "../../Page/NetworkManager/NetworkManagerAdd/NetworkManagerAdd";
import Config from "../../../config/Config";
import BusinessBook from "../../Page/BusinessBook/BusinessBook";
import Statistics from "../../Page/Statistics/Statistics";
import NetworkManagerEdit from "../../Page/NetworkManager/NetworkManagerEdit/NetworkManagerEdit";


class NavigatorUser extends Component{

    render(){
        return (
            <div style={{display : "flex", flexDirection : "column"}}>


                <Switch>
                    {
                        Config.PAGES.map((element, index)=>
                            <Route
                                key ={index}
                                path={element.route}
                                component={element.component()}
                                exact={element.exact}
                            />)
                    }

                </Switch>

                <NavUser/>
            </div>
        );
    }
}

export default NavigatorUser;