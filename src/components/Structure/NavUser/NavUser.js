/**
 * Created by @VanSoftware on 2019-07-04.
 */
import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import Config from "../../../config/Config";
import {compose} from "redux";
import {connect} from "react-redux";
import NavUserProfile from "./NavUserProfile/NavUserProfile";
import NavUserDefault from "./NavUserDefault/NavUserDefault";


class NavUser extends Component{

    render(){



       let page = Config.getPageByPath(this.props.location.pathname);

        return(
            <React.Fragment>
                {
                    [Config.ROUTE_PAGE_PROFILE].includes(page.route)
                    ? <NavUserProfile/>
                    : <NavUserDefault/>
                }
            </React.Fragment>
        )
    }
}

export default compose( withRouter, connect(null, null))(NavUser);
