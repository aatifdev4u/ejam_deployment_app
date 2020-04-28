import React, { useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { deleteDeployment } from '../_actions/deploy_actions';

function DeployTable() {
    const dispatch = useDispatch();
    const deployments = useSelector(state => state.deployment);
    
    const handleClick = (id)=>{
        dispatch(deleteDeployment({id}))
    }

    const renderItem = deployments.deploymentList.length > 0 &&  deployments.deploymentList.map((deployment)=>{
        return (
            <tr key={deployment._id}>
                <td>{deployment.url}</td>
                <td>{deployment.templateName}</td>
                <td>{deployment.version}</td>
                <td>{deployment.deployedAt}</td>
                <td>
                    <button className="btn btn-primary" onClick={()=>handleClick(deployment._id)}> Delete</button>
                </td>
            </tr>
        )
    })
    
    return (
        <div>
            <table class="table">
                <thead>
                <tr>
                    <th>Url</th>
                    <th>Template</th>
                    <th>Version</th>
                    <th>DeployedOn</th>
                    <th>Action</th>
                </tr>
                </thead>
                <tbody>
                    {renderItem}
                    {deployments.deploymentList.length === 0 && <div>No Deployment available...</div>}
                </tbody>
            </table>
        </div>
    )
}

export default DeployTable
