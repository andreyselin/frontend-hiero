import actionTypes from '../../constants/actionTypes';


export const assignNavigatorAContext = params => {
    return {
        type: actionTypes.navigator.assignContext,
        payload: {
            contextIndex: params.contextIndex,
            navigatorIndex: params.navigatorIndex,
            /*
            // Size, position of the window (NOT CONTEXT!!!)
            navigatorProps: {
                l: 10,
                t: 10,
                w: 10,
                h: 10
            }
            */
        }
    };
};

export const setNavigatorActive = indexToSetActive => {
    return {
        type: actionTypes.app.setNavigatorActive,
        payload: indexToSetActive
    };
};