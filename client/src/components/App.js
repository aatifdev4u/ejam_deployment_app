import React, { useEffect } from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
import Form from './Form'
import DeployTable from './DeployTable';
import '../App.css'
import { useDispatch, useSelector } from "react-redux";
import { getVersions } from '../_actions/versions_actions'
import { getDeployement } from '../_actions/deploy_actions'
import Header from './Header';


function App() {
    const dispatch = useDispatch();
    const versionData = useSelector(state => state.versions);

    useEffect(() => {
        dispatch(getDeployement())
        dispatch(getVersions());
    }, [])

   
    return (
        <div className="container py-4"> 
            <Header/>
            <Form versionData={versionData}/>
            <DeployTable/>
        </div>
    )
}

export default App
