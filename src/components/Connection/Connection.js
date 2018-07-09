import React, {Component} from 'react';
import "./Connection.css";
import {drawConnection} from './drawConnection'

class Connection extends Component {

    render() {
        return (
            <div className="Connection"
                 onClick={this.props.onClick}
                 style={drawConnection(this.props.from, this.props.to)}>
            </div>
        )
    }
}

export default Connection;