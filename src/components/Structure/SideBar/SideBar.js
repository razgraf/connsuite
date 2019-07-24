/**
 * Created by @VanSoftware on 2019-07-05.
 */
import React, {Component} from 'react';
import styles from './SideBar.module.scss';
import SideBarElement from "./SideBarElement/SideBarElement";
import Config from "../../../config/Config";
import PropTypes from "prop-types";

class SideBar extends Component {

    constructor(props){
        super(props);

        this.state = {
            isBottomReached : false
        };

        this.refToSideBar = React.createRef();
    }



    componentDidMount() {
        window.addEventListener("scroll",this.watchScroll);
        this.watchScroll();
    }

    componentWillUnmount() {
        window.removeEventListener("scroll", this.watchScroll);
    }






    watchScroll = (event) => {
        let isBottomReached = (window.innerHeight + window.pageYOffset + 33) >= document.body.offsetHeight;
        if(isBottomReached !== this.state.isBottomReached)
            this.setState({isBottomReached : isBottomReached});
    };


    render() {
        return(
            <div ref={this.refToSideBar} className={styles.SideBar} data-bottom={this.state.isBottomReached}>
                <div className={styles.container}>
                    <SideBarElement route={Config.ROUTE_PAGE_DASHBOARD} />
                    <SideBarElement route={Config.ROUTE_PAGE_PORTFOLIO}  />
                    <SideBarElement route={Config.ROUTE_PAGE_BUSINESS_BOOK}  />
                    <SideBarElement route={Config.ROUTE_PAGE_STATISTICS} />
                    <div className={styles.divider}/>
                    <SideBarElement
                        route={Config.ROUTE_PAGE_PROFILE}
                        target={Config.ROUTE_PAGE_PROFILE_CLEAN + Config.DUMMY_USERS.self.username.main}
                    />

                </div>
            </div>
        )
    }

    static propTypes = {
        isBottomReached: PropTypes.bool
    }

    static defaultProps = {
        isBottomReached : false,
    }


}
export default SideBar;