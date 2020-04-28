import { combineReducers } from 'redux';
import deployment from './deploy_reducer';
import versions from './versions_reducer'

const rootReducer = combineReducers({
    versions,
    deployment
});

export default rootReducer;