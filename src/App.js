import React from 'react';
import Navigator from './components/Navigator';
import appService from './services/app';
import {connect} from 'react-redux';
import './App.css';


function mapStateToProps(state) {
    return {
        navigators: state.navigators
    }
}


class App extends React.Component {

    componentDidMount () {
        appService.init();
    }

    render () {
        return (
            <div className="Navigation"> {
                this.props.navigators.list.map((aNavigator, index) => <Navigator
                    key={index}
                    /> )
            }</div>
        )
    }
}

export default connect(
    mapStateToProps,
    {} /*matchDispatchToProps*/
)(App);
