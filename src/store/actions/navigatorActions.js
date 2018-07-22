import actionTypes from '../../constants/actionTypes';


export const assignNavigatorAContext = params => {
    return {
        type: actionTypes.navigator.assignContext,
        payload: {
            context: params.context,
            navigatorIndex: params.navigatorIndex,
            /*
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
