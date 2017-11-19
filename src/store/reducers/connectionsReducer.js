import {getContextFromServer} from '../api/dataFromServer';

export default function connections(state = getContextFromServer.connections, action) {
    return state;
}

