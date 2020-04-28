import {
    ADD_DEPLOYMENT,
    GET_DEPLOYMENT,
    DELETE_DEPLOYMENT
} from '../_actions/types';
 
const intialState = {
    deploymentList : [],
    loading: false
}
export default function(state=intialState,action){
    switch(action.type){
        case ADD_DEPLOYMENT:
            return {
                ...state,
                deploymentList: [...state.deploymentList, action.payload]
            }
        case GET_DEPLOYMENT:
            return  {
                ...state,
                deploymentList: [...action.payload]
            }
        case DELETE_DEPLOYMENT:
            return {
                ...state,
                deploymentList: state.deploymentList.filter((deployment) => deployment._id !== action.payload)
            }
        default:
            return state;
    }
}