import React from 'react';
import './Navigator.css';
import Context from '../Context';

class Navigator extends React.Component {
    constructor () {
        super();
    }
    render () {
        return (
            <div className="Navigator">
                <Context />
            </div>
        )
    }
}

export default Navigator;