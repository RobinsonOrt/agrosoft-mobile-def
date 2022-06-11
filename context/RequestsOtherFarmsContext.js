import global from "../global";
import {REACT_APP_API_URL, AGROSOFT_LINK} from '@env'
import React, { useState, createContext } from "react";
import axios from "axios";

const MyRequestsOtherFarmsContext =createContext();

const MyRequestsOtherFarmsProvider = ({children}) => {
    const [otherRequests, setOtherRequests] = useState([]);
    const [error, setError] = useState(false);
    const [message, setMessage] = useState("");

    const LoadOtherRequests = async (stateReq, page) => {
        await axios.get(REACT_APP_API_URL + "/api/getinrequests/"+ stateReq + "/" + global.idUser + "/" + page)
          .then(res => {
            setOtherRequests(res.data.response);
        })
    }

    const AcceptRequest = async (idRequest) => {
        await axios.get(REACT_APP_API_URL + "/api/acceptrequest/"+ idRequest)
            .then(res => {
                setMessage(res.data.message);
                setError(res.data.error);
                LoadOtherRequests("1", 0);
            })
    }

    const RejectRequest = async (idRequest) => {
        await axios.get(REACT_APP_API_URL + "/api/rejectrequest/"+ idRequest)
            .then(res => {
                setMessage(res.data.message);
                setError(res.data.error);
                LoadOtherRequests("1", 0);
            })
    }
    return (
        <MyRequestsOtherFarmsContext.Provider
            value={{
                LoadOtherRequests,
                otherRequests,
                message,
                error,
                setError,
                setMessage,
                setOtherRequests,
                AcceptRequest,
                RejectRequest
            }}
        >
            {children}
        </MyRequestsOtherFarmsContext.Provider>
    )
}

export { MyRequestsOtherFarmsProvider };
export default MyRequestsOtherFarmsContext;