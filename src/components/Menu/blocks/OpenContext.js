import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {hideMenuBlock} from '../../../store/actions/menuBlocksActions';
import {menuBlocks} from "../../../const";
import contextService from '../../../services/context';

class MenuBlockOpenContext extends Component {
    constructor(props) {
        super(props);
        this.openContext = this.openContext.bind(this);
        this.state = {
            contexts: [
                {id: 1, title: "Default"},
                {id: 2, title: "Second context"},
                {id: 3, title: "Russian tsars"}
            ]
        };
    }


    componentDidMount() {
        contextService.listRecent();
    }


    openContext (contextId) {
        contextService.open({contextId:contextId});
        this.props.hideMenuBlock(menuBlocks.openContext);
    }


    render () {
        return (
            <div className="Menu_block __open-context">
                <div className="Menu_block_header">Open context</div>
                {
                this.props.menuBlock.list === null ? (()=><div>Загрузка</div>)() :
                this.props.menuBlock.list.map((el, index) =>
                    <div key={index}><button
                        className="Menu_block_row"
                        onClick={()=>this.openContext(el.id)}
                        >&larr; {el.title}
                    </button></div>
                )}
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        menuBlock: state.menuBlocks.openContext
    }
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators({
        hideMenuBlock: hideMenuBlock
    }, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(MenuBlockOpenContext);