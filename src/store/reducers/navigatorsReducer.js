// import contextService from '../../services/context';
import {actionTypes} from '../../constants/const';
// import Store from '../store.js';


var defaultState = {
    active: null,
    list: []
};

// Called navigators because navigators in store is collection, not a single object
export default function navigatorsReducer(state = defaultState, action) {

    if (action.type === actionTypes.navigator.assignContext) {

        var newState = {...defaultState};
        newState.list[action.payload.navigatorIndex] = action.payload;
        newState.active = action.payload.contextIndex;

        // This must be changed to specific redux immutable array creator like here:
        // https://redux.js.org/recipes/structuring-reducers/immutable-update-patterns
        return newState;
    }

    return state;
}

