import {actionTypes, menuBlocks} from '../../const';

var initialState={
    [menuBlocks.addGlyph]:     {show:false},
    [menuBlocks.addConnection]:{show:false}, // Not used due to using more complex addConnectionReducer
    [menuBlocks.editGlyph]:    {show:false},
    [menuBlocks.openContext]:  {show:false, list: null}
};

export default function menuBlocksReducer(state = initialState, action) {

    if (action.type === actionTypes.menuBlocks.show) {
        return {
            ...state,
            [action.payload.name]: {...state[action.payload.name], show: true}
        };
    }

    else if (action.type === actionTypes.menuBlocks.hide){
        return {
            ...state,
            [action.payload.name]: {...state[action.payload.name], show: false}
        };
    }

    else if (action.type === actionTypes.menuBlocks.toggle){
        return {
            ...state,
            [action.payload.name]: {...state[action.payload.name], show: !state[action.payload.name].show}
        };
    }


        //////////////////////
        //                  //
        //  Specific below  //
        //                  //
        //////////////////////


    else if (action.type === actionTypes.menuBlocks.showContextsToOpen){
        return {
            ...state,
            [menuBlocks.openContext]: {...state[menuBlocks.openContext], list: action.payload}
        };
    }

    return state;
}
