import React, {Component} from 'react';
import NavigatorUser from "./NavigatorUser/NavigatorUser";
import NavigatorVisitor from "./NavigatorVisitor/NavigatorVisitor";


class App extends Component{

    state = {
        auth : true
    };

    render(){
        return (
            <div className="App">
                {this.state.auth ? <NavigatorUser/>  : <NavigatorVisitor/>}
            </div>
        )
    }

}

export default App;
