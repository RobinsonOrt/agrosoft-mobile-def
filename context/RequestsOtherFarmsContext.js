import global from "../global";
import {REACT_APP_API_URL, AGROSOFT_LINK} from '@env'
import React, { useState, createContext } from "react";
import axios from "axios";

const MyRequestsOtherFarmsContext =createContext();

const MyRequestsOtherFarmsProvider = ({children}) => {
    const [otherRequests, setOtherRequests] = useState([]);
    const [error, setError] = useState(false);
    const [message, setMessage] = useState("");
    const [sorters, setSorters] = useState({page: 0});
    const [maxPage, setMaxPage] = useState(0);

    const LoadOtherRequests = async (stateReq) => {
        await axios.get(REACT_APP_API_URL + "/api/getinrequests/"+ stateReq + "/" + global.idUser + "/" + sorters.page)
          .then(res => {
            setMaxPage(res.data.maxPage)
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
                RejectRequest,
                maxPage,
                setSorters,
                sorters,
                setMaxPage
            }}
        >
            {children}
        </MyRequestsOtherFarmsContext.Provider>
    )
}

export { MyRequestsOtherFarmsProvider };
export default MyRequestsOtherFarmsContext;