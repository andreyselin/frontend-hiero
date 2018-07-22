import contextService from '../../services/context';
import actionTypes from '../../constants/actionTypes';
import Store from '../store.js';


// Called navigators because navigators in store is collection, not a single object
export default function navigatorsReducer(state = [], action) {

    if (action.type === actionTypes.navigator.assignContext) {

        var newState = [];
        newState[action.payload.navigatorIndex] = {
            // navigator: {}, // navigator properties
            context: action.payload.context
        };
        // This must be changed to specific redux immutable array creator like here:
        // https://redux.js.org/recipes/structuring-reducers/immutable-update-patterns
        return newState;
    }

    return state;
}

