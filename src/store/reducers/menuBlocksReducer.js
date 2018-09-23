import {actionTypes, menuBlocks} from '../../const';

var initialState={
    [menuBlocks.addConnection]:{show:false}, // Not used due to using more complex addConnectionReducer
    [menuBlocks.editGlyph]:    {show:false},
    [menuBlocks.openContext]:  {show:false, list: null}
};

export default function menuBlocksReducer(state = initialState, action) {

    if (action.type === actionTypes.menuBlocks.show) {

        // Specific handling depending on menuBlock name
        // can be performed here when it is required

        return {
            ...state,
            [action.payload.name]: {...action.payload.data, show: true}
        };
    }

    else if (action.type === actionTypes.menuBlocks.hide){
        return {
            ...state,
            [action.payload.name]: {...state[action.payload.name], show: false}
        };
    }

    else if (action.type === actionTypes.menuBlocks.toggle){
        // Data can be optional here
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
