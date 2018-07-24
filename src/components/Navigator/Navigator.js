import React from 'react';
import './Navigator.css';
import Context from '../Context';
import {connect} from 'react-redux';
import Menu from '../Menu';

class Navigator extends React.Component {

    constructor (props) {
        super(props); // ? What for ?
    }

    render () {
        return (
            <div className="Navigator">
                <Menu />
                <Context />
            </div>
        )
    }
}

export default Navigator;