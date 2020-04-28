import {
    GET_VERSIONS
} from './types'
import axios from 'axios';

export function getVersions(){
    const request = axios.get(`/api/deployment/get_details`)
    .then(response => {
        return response.data.data;
    });
   

    return {
        type: GET_VERSIONS,
        payload: request
    }
}