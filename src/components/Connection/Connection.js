import React from 'react';
import "./Connection.css";
import {drawConnection} from './drawConnection'

const Connection = ({from, to})=> {
    return <div className="Connection" style={drawConnection(from, to)}></div>
}

export default Connection;