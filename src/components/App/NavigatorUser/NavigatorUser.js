/**
 * Created by @VanSoftware on 2019-07-04.
 */
import React, {Component} from 'react';
import {Switch, Route} from 'react-router-dom';

import Dashboard from "../../Page/Dashboard/Dashboard";
import Portfolio from "../../Page/Portfolio/Portfolio";
import NavUser from "../../Structure/NavUser/NavUser";
import NetworkManager from "../../Page/NetworkManager/NetworkManager";
import Config from "../../../config/Config";
import BusinessBook from "../../Page/BusinessBook/BusinessBook";
import Statistics from "../../Page/Statistics/Statistics";


class NavigatorUser extends Component{

    render(){
        return (
            <div style={{display : "flex", flexDirection : "column"}}>


                <Switch>
                    <Route path={Config.ROUTE_PAGE_DASHBOARD} exact component={Dashboard}/>
                    <Route path={Config.ROUTE_PAGE_PORTFOLIO} exact component={Portfolio}/>
                    <Route path={Config.ROUTE_PAGE_BUSINESS_BOOK} exact component={BusinessBook}/>
                    <Route path={Config.ROUTE_PAGE_STATISTICS} exact component={Statistics}/>


                    <Route path={Config.ROUTE_PAGE_NETWORK_EDIT} exact component={NetworkManager}/>
                    <Route path={Config.ROUTE_PAGE_NETWORK_ADD} exact component={NetworkManager}/>



                    <Route path={Config.ROUTE_PAGE_PROFILE} exact component={Dashboard}/>
                </Switch>

                <NavUser/>
            </div>
        );
    }
}

export default NavigatorUser;