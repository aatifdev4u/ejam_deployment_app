import {
    GET_VERSIONS
} from '../_actions/types';
 

export default function(state=[],action){
    switch(action.type){
        case GET_VERSIONS:
            return [...action.payload]
        default:
            return state;
    }
}