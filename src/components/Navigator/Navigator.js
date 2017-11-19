import React from 'react';
import './Navigator.css';
import Context from '../Context';
import Menu from '../Menu';

class Navigator extends React.Component {

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