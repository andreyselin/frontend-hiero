import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {addConnectionTurnOff} from '../../../store/actions/connectionActions';
import {hideMenuBlock} from '../../../store/actions/menuBlocksActions';

class MenuBlockAddConnection extends Component {
    constructor(props) {
        super(props);
        this.undo = this.undo.bind(this);
    }

    undo () {
        this.props.addConnectionTurnOff();
    }

    render () {
        return (
            <div className="Menu_block">
                <div className="Menu_block_header">New connection</div>
                <div className="Menu_block_row">
                    <button onClick={this.undo}>Undo</button>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {}
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators({
            addConnectionTurnOff: addConnectionTurnOff,
            hideMenuBlock: hideMenuBlock
        },
        dispatch
    );
}

export default connect(mapStateToProps, matchDispatchToProps)(MenuBlockAddConnection);