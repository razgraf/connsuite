/**
 * Created by @VanSoftware on 2019-07-31.
 */


import React, {PureComponent} from 'react';
import {Helper} from "../../config/Util";


class BasePage extends PureComponent{
    componentDidMount() {

        let e = (document.scrollingElement || document.documentElement);
        if (!Helper.isEmpty(e)) e.scrollTop = 0;
    }



    render() {return <div/>}
}

export default BasePage;