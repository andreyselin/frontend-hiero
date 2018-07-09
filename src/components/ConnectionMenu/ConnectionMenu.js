import React, {Component} from 'react';
import './ConnectionMenu.css';

class ConnectionMenu extends Component {
    /* constructor(props) {
        super(props);
        this.params = this.props.params;
    } */

    removeConnection(connection) {
        console.log('remove');
    }

    render () {
        return (
            <div className = "connection-menu"
                style = {{
                    top: this.props.params.top,
                    left: this.props.params.left,
                    display: this.props.params.display
                }}>
                <ul className = "connection-menu__list">
                    <li className = "connection-menu__item">
                        <a className = "connection-menu__link"
                           onClick = { this.removeConnection }
                           href="Remove">
                            Remove
                        </a>
                    </li>
                </ul>
            </div>
        )
    }
}

export default ConnectionMenu;