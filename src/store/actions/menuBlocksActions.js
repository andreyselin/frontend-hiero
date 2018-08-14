import {actionTypes/* , menuBlocks */} from '../../constants/const';

export const showMenuBlock = name => {
    return {
        type: actionTypes.menuBlocks.show,
        payload: {name: name} // Extendable
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