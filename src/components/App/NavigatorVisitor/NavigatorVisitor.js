/**
 * Created by @VanSoftware on 2019-07-04.
 */
import React, {Component} from 'react';
import {Switch, Route} from 'react-router-dom';



class NavigatorVisitor extends Component{

    render(){
        return (
            <Switch>
                <Route path="/" render={()=><p>Welcome, Visitor</p>}/>
            </Switch>
        );
    }
}

export default NavigatorVisitor;