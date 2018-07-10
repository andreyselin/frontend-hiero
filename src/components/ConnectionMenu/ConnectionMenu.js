import React, {Component} from 'react';
import './ConnectionMenu.css';

class ConnectionMenu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            top: '5%',
            left: '5%',
            display: 'none',
            targetConnection: null
        };
        this.removeConnection = this.removeConnection.bind(this);
    }

    removeConnection(e) {
        e.preventDefault();
        this.props.removeConnection(e, this.state.targetConnection);
    }

    render () {
        return (
            <div className = "connection-menu"
                style = {{
                    top: this.state.top,
                    left: this.state.left,
                    display: this.state.display
                }}>
                <ul className = "connection-menu__list">
                    <li className = "connection-menu__item">
                        <a className = "connection-menu__link"
                           onClick = { this.removeConnection }
                           href="removeLink">
                            Remove
                        </a>
                    </li>
                </ul>
            </div>
        )
    }
}

export default ConnectionMenu;