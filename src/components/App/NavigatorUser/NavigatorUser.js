/**
 * Created by @VanSoftware on 2019-07-04.
 */
import React, {Component} from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import Config from "../../../config/Config";
import NavUser from "../../Structure/NavUser/NavUser";
import Footer from "../../Structure/Footer/Footer";

class NavigatorUser extends Component{

    render(){

        let fallback = Config.getPageByRoute(Config.ROUTE_PAGE_DASHBOARD);

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

                    <Redirect from="/" to={fallback.route}/>
                </Switch>

                <NavUser/>
            </div>
        );
    }
}

export default NavigatorUser;