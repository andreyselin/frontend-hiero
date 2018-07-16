import React from 'react';
import './Navigator.css';
import Context from '../Context';
import Menu from '../Menu';
import contextsService from '../../services/contexts';

class Navigator extends React.Component {

    componentDidMount() {
        contextsService.openDefault();
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