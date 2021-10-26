import React, {useState, useEffect} from 'react'
import {useParams} from 'react-router-dom'
import axios from 'axios'
import {showErrMsg, showSuccessMsg} from '../../utils/notification/Notification'
import { Redirect } from "react-router-dom";

function ActivationEmail() {
    const {activation_token} = useParams()
    const [err, setErr] = useState('')
   

    useEffect(() => {
        if(activation_token){
            const activationEmail = async () => {
                try {
                    const res = await axios.post('/user/activation', {activation_token})
                    
                } catch (err) {
                    err.response.data.msg && setErr(err.response.data.msg)
                }
            }
            activationEmail()
        }
    },[activation_token])

    return (
      
        <div className="active_page">
             <Redirect to='/login'/>
             
             {err && showErrMsg(err)}
        </div>
    )
}

export default ActivationEmail
