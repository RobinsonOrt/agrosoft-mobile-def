import global from "../global";
import React, { useState, createContext } from "react";
import {REACT_APP_API_URL, AGROSOFT_LINK} from '@env'
import axios from "axios";

const MyLaborsContext = createContext();

const MyLaborsProvider = ({children}) => {
    const [labors, setLabors] = useState([]);
    const [error, setError] = useState(false);
    const [message, setMessage] = useState("");
    const [labor, setLabor]= useState([]);

    const LoadLabors = async (sorter, order) => {
        await axios.get(REACT_APP_API_URL + "/api/subroles/"+ global.idFarm + "/" + sorter + "/" + order)
          .then(res => {
            setLabors(res.data.response);
        })
    }

    const UpdateLabor = async (laborToModify) => {
        await axios.put(REACT_APP_API_URL + "/api/updatesubrole", laborToModify)
          .then(res => {
            setError(res.data.error);
            setMessage(res.data.response);
            LoadLabors("name_sub_role", "asc");
        })
    }

    const DeleteLabor = async (laborToDelete) => {
        await axios.put(REACT_APP_API_URL + "/api/removesubrole/" + laborToDelete)
            .then(res => {
                setError(res.data.error);
                setMessage(res.data.response);
                LoadLabors("name_sub_role", "asc");
        })
    }

    const AddLabor = async (laborToAdd) => {
        await axios.post(REACT_APP_API_URL + "/api/addsubrole", laborToAdd)
            .then(res => {
                setError(res.data.error);
                setMessage(res.data.response);
                LoadLabors("name_sub_role", "asc");
        })
    }

    return (
        <MyLaborsContext.Provider
            value={{
                LoadLabors,
                labors,
                message,
                error,
                setError,
                setMessage,
                labor,
                setLabor,
                UpdateLabor,
                DeleteLabor,
                AddLabor
            }}
        >
            {children}
        </MyLaborsContext.Provider>
    )
};

export { MyLaborsProvider };
export default MyLaborsContext;