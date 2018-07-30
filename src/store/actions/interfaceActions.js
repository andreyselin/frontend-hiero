import actionTypes from '../../constants/actionTypes';

const menuBlocks = {
    addGlyph:   "menuBlocks.addGlyph",
    editGlyph:  "menuBlocks.editGlyph"
};

export const showMenuBlock = ()=> {
    return {
        type: actionTypes.interface.showMenuBlock
    };
};

export const hideMenuBlock = ()=> {
    return {
        type: actionTypes.interface.hideMenuBlock
    };
};