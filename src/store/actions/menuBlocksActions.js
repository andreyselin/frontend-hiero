import {actionTypes, menuBlocks} from '../../const';

export const showMenuBlock = (name, data) => {
    return {
        type: actionTypes.menuBlocks.show,
        payload: {
            name: name,
            data: data
        }
    };
};

export const hideMenuBlock = name => {
    return {
        type: actionTypes.menuBlocks.hide,
        payload: {name: name} // Extendable
    };
};

export const toggleMenuBlock = name => {
    return {
        type: actionTypes.menuBlocks.toggle,
        payload: {name: name}
    };
};


        ///////////////////////
        //                   //
        //  Specific below,  //
        //  some unifying    //
        //  required         //
        //                   //
        ///////////////////////



export const showEditGlyphMenuBlock = theGlyph => showMenuBlock (menuBlocks.editGlyph, theGlyph);

// This if for async filling already opened menu block,
// should be refactored via setTimeout in reducer
// Can be made via updateMenuBlock action
export const showContextsToOpen = list => {
    return {
        type: actionTypes.menuBlocks.showContextsToOpen,
        payload: list
    };
};
