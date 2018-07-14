import React, {Component} from 'react';
import "./Connection.css";
import {drawConnection} from './drawConnection'

class Connection extends Component {

    render() {
        return (
            <div className="Connection"
                 onClick={this.props.onClick.bind(null, this.props.connection.link)}
                 style={drawConnection(this.props.from, this.props.to)}
                 data-link-key={this.props.connection.link} >
            </div>
        )
    }
}

export default Connection;