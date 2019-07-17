/**
 * Created by @VanSoftware on 2019-07-04.
 */
import React, {Component} from 'react';
import {Switch, Route} from 'react-router-dom';
import NavUser from "../../Structure/NavUser/NavUser";
import Config from "../../../config/Config";

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