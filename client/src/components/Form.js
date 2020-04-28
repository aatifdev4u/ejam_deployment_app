import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from "react-redux";
import { addDeployment } from '../_actions/deploy_actions';

function Form() {
    const dispatch = useDispatch();
    const versionData = useSelector(state => state.versions);

    const [templateName, setTemplateName] = useState('')
    const [version, setVersion] = useState('');
    const [url, setUrl] = useState('')
    const [templateOption, settemplateOption] = useState([<option value="Select Template">Select Template</option>])
    const [versionOption, setVersionOption] = useState([<option value="Select version">Select version</option>])
    const [warningMsg, setWarningMsg] = useState('')
    const [warningStatus, setwarningStatus] = useState(false)
    const [deployingStatus, setDeployingStatus] = useState(false)
   
    useEffect(() => {
        let dataOption =  versionData.map((item)=> {
            return <option key={item.name} value={item.name}>{item.name}</option>
          })
          settemplateOption([...templateOption, ...dataOption])
    }, [versionData])

    const resetForm = ()=>{
        setVersionOption([<option value="Select version">Select version</option>])
        setTemplateName('')
        setVersion('')
    }

    const handleChange = (event) =>{
        resetForm()

        if(event.target.value === "Select Template"){
            resetForm()
        }else{
            let selectedOption = versionData.find((item)=> item.name === event.target.value)

            let dataOption = selectedOption.versions.map((item)=> {
                return <option key={`${selectedOption.name}${item}`} value={item}>{item}</option>
            })
            dataOption.unshift(<option value="Select version">Select version</option>)
            
            setTemplateName(event.target.value);
            setVersionOption([dataOption])
        }
      }

    const handleVersionChange = (event)=>{
        setVersion(event.target.value)
    }

    const handleInputChange = (event)=>{
        setUrl(event.target.value)
    }

    const valiateURL = (urlToValidate)=>{
        return /(http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/.test(urlToValidate)
    }
     
     
    const handleSubmit = (event)=>{
        event.preventDefault();
        if(templateName && version && url && valiateURL(url)){
            let payload = {
                url,
                templateName,
                version
            }
            console.log(payload);
            setDeployingStatus(true)
            setWarningMsg(false)
            setTimeout(()=>{
                dispatch(addDeployment(payload))
                setDeployingStatus(false)
            }, 3000)
            
            resetForm();
            setUrl('')
        }else{
            setwarningStatus(true);
            if(!valiateURL(url) && url){
                setWarningMsg('Please validate URL')
            }else{
                setWarningMsg('Please fill all the fields')
            }
        }

    }
    return (
        <div className="my-4">
            <form className="form-inline " onSubmit={handleSubmit}>
                <select 
                        className="form-control mb-2 mr-sm-4  mr-md-3 mr-lg-3"
                        onChange={handleChange}
                    >
                        {templateOption}
                </select>
                <select 
                        className="form-control mb-2 mr-sm-4 mr-md-3 mr-lg-3"
                        onChange={handleVersionChange}
                    >
                        {versionOption}
                </select>
                <input
                    type="text"
                    className="form-control mb-2 mr-sm-4 mr-md-4 mr-lg-4 url-grow"
                    placeholder="Enter URL string"
                    onChange={handleInputChange}
                    value={url}
                />
                <button
                    className="btn btn-danger mb-2"
                >Deploy</button>
                <div className="spinner-grow text-danger"></div>
            </form>
            {warningStatus && <div className="warning-msg">{warningMsg}</div>}
            {
                deployingStatus &&  
                <div class="container showspinner">               
                    <div class="spinner-border spinner-border-md"></div>
                    <div class="spinner-grow spinner-grow-md"></div>
                    <span>Deploying...</span>
                </div>
            }
           
            
        </div>
    )
}

export default Form
