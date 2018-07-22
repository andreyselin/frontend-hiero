import React from 'react';
import './Navigator.css';
import Context from '../Context';
import {connect} from 'react-redux';
import Menu from '../Menu';

class Navigator extends React.Component {

    constructor (props) {
        console.log("constructor", props);
        super(props); // ? What for ?
    }

    componentDidUpdate() {}

    render () {
        return (
            <div className="Navigator">
                <Menu />
                <Context content={this.props.context} />
            </div>
        )
    }
}

 export default Navigator;


/*
function mapStateToProps(state) {
    console.log("state", state);
    return state;
}
export default connect(
    mapStateToProps,
    {} /!*matchDispatchToProps*!/
)(Navigator);
*/