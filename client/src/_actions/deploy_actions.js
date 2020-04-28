import {
    ADD_DEPLOYMENT,
    GET_DEPLOYMENT,
    DELETE_DEPLOYMENT,
} from './types'
import axios from 'axios';

export function getDeployement(){
    const request = axios.get(`/api/deployment/get_deployment`)
    .then(response => {
        return response.data.data;
    });
   

    return {
        type: GET_DEPLOYMENT,
        payload: request
    }
}

export function addDeployment(newDeployment){
    const request = axios.post(`/api/deployment/add_deployment`, newDeployment)
    .then(response => {
        return response.data.data;
    });
   

    return {
        type: ADD_DEPLOYMENT,
        payload: request
    }
}

export function deleteDeployment(deleteId){
    const id = axios.post(`/api/deployment/delete_deployment`, deleteId)
    .then(response => {
        return response.data.data._id;
    });
   

    return {
        type: DELETE_DEPLOYMENT,
        payload: id
    }
}

