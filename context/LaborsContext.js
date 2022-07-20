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
    const [sorters, setSorters] = useState({"sorter": "name_sub_role", "order": "asc", "page": 0});

    const LoadLabors = async () => {
        await axios.get(REACT_APP_API_URL + "/api/subroles/"+ global.idFarm + "/" + sorters.sorter + "/" + sorters.order)
          .then(res => {
            setLabors(res.data.response);
        })
    }

    const UpdateLabor = async (laborToModify) => {
        const res = await axios.put(REACT_APP_API_URL + "/api/updatesubrole", laborToModify)
        setError(res.data.error);
        setMessage(res.data.response);
        LoadLabors();
        return res;
    }

    const DeleteLabor = async (laborToDelete) => {
        await axios.put(REACT_APP_API_URL + "/api/removesubrole/" + laborToDelete)
            .then(res => {
                setError(res.data.error);
                setMessage(res.data.response);
                LoadLabors();
        })
    }

    const AddLabor = async (laborToAdd) => {
        const response = await axios.post(REACT_APP_API_URL + "/api/addsubrole", laborToAdd);
        setError(response.data.error);
        setMessage(response.data.response);
        sorters.sorter = "created_sub_role";
        sorters.order = 'desc';
        LoadLabors();
        return response;
    }

    
    const FindLabors = async (search) => {
        const response = await axios.get(REACT_APP_API_URL + "/api/findsubroles/"+ global.idFarm + "/" + search );
        setLabors(response.data.response);
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
                AddLabor,
                sorters,
                setSorters,
                FindLabors
            }}
        >
            {children}
        </MyLaborsContext.Provider>
    )
};

export { MyLaborsProvider };
export default MyLaborsContext;