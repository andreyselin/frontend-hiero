import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {setContextName} from '../../../store/actions/contextInfoActions';

class MenuBlockContextInfo extends Component {

    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.showRenameForm = this.showRenameForm.bind(this);
        this.hideRenameForm = this.hideRenameForm.bind(this);
        this.doRename = this.doRename.bind(this);
        this.state = {
            renameMode: false,
            contextTitleRenamed: ""
        };
    }

    handleChange (target) {
        return event=>this.setState({[target]:event.target.value});
    }

    showRenameForm () {
        this.setState({contextTitleRenamed: this.props.contextTitle, renameMode: true});
    }

    hideRenameForm () {
        this.setState({renameMode: false});
    }

    doRename () {
        this.props.setContextName(this.state.contextTitleRenamed);
        this.hideRenameForm();
    }

    render () {

        return (
            <div className="Menu_block">
                <div className="Menu_block_header">{this.props.contextTitle}</div>
                <div className={"Menu_block_row"+(this.state.renameMode ? ' __collapsed' : '')}>
                    <button onClick={this.showRenameForm}>Rename</button>
                </div>
                <div className={"Menu_block_row"+(this.state.renameMode ? '' : ' __collapsed')}>
                    New context name:<br />
                    <input
                        type="text"
                        value={this.state.contextTitleRenamed}
                        onChange={ this.handleChange('contextTitleRenamed') }
                        placeholder="Context name"
                        />
                    <br />
                    <button onClick={this.doRename}>Save</button>
                    <button onClick={this.hideRenameForm}>Cancel</button>
                </div>
            </div>
        );

    }
}

function mapStateToProps(state) {
    return {
        contextTitle: state.activeContext.info.title
    }
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators(
        {
            setContextName: setContextName
        },
        dispatch
    );
}

export default connect(mapStateToProps, matchDispatchToProps)(MenuBlockContextInfo);