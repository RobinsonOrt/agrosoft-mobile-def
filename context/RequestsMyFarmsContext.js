import global from "../global";
import {REACT_APP_API_URL, AGROSOFT_LINK} from '@env'
import React, { useState, createContext } from "react";
import axios from "axios";

const MyRequestsMyFarmsContext =createContext();

const MyRequestsMyFarmsProvider = ({children}) => {
    const [myRequests, setMyRequests] = useState([]);
    const [error, setError] = useState(false);
    const [message, setMessage] = useState("");
    const [error2, setError2] = useState(false);

    const LoadMyRequests = async (stateReq, page) => {
        await axios.get(REACT_APP_API_URL + "/api/getoutrequests/"+ stateReq + "/" + global.idUser + "/" + page)
          .then(res => {
            setMyRequests(res.data.response);
        })
    }

    const CancelRequest = async (idRequest) => {
        await axios.get(REACT_APP_API_URL + "/api/cancelrequest/"+ idRequest)
            .then(res => {
                setMessage(res.data.response);
                setError(res.data.error);
                LoadMyRequests("1", 0);
            })
    }

    const CreateRequest = async (email, idFarm, role) => {
        const data = {}
        data.emailUserReceiver = email;
        data.idFarm = idFarm;
        data.idUserEmmiter = global.idUser;
        data.idRole = role;

        const requestCreate = await axios.post(REACT_APP_API_URL + "/api/createrequest", data)
        LoadMyRequests("1", 0);
        return requestCreate

    }

    return (
        <MyRequestsMyFarmsContext.Provider
            value={{
                LoadMyRequests,
                myRequests,
                message,
                error,
                setError,
                setMessage,
                setMyRequests,
                CancelRequest,
                CreateRequest,
                setError2,
                error2
            }}
        >
            {children}
        </MyRequestsMyFarmsContext.Provider>
    )
}

export { MyRequestsMyFarmsProvider };
export default MyRequestsMyFarmsContext;