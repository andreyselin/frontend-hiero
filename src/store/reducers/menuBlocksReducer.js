import {actionTypes, menuBlocks} from '../../constants/const';

var initialState={
    [menuBlocks.addGlyph]:     {show:false},
    [menuBlocks.addConnection]:{show:false}, // Not used due to using more complex addConnectionReducer
    [menuBlocks.editGlyph]:    {show:false},
    [menuBlocks.openContext]:  {show:false}
};

export default function menuBlocksReducer(state = initialState, action) {

    if (action.type === actionTypes.menuBlocks.show) {
        return {
            ...state,
            [action.payload.name]: {show: true}
        };
    }

    else if (action.type === actionTypes.menuBlocks.hide){
        return {
            ...state,
            [action.payload.name]: {show: false}
        };
    }

    else if (action.type === actionTypes.menuBlocks.toggle){
        return {
            ...state,
            [action.payload.name]: {show: !state[action.payload.name].show}
        };
    }

    return state;
}
