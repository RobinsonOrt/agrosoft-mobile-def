import global from "../global";
import React, { useState, createContext } from "react";
import {REACT_APP_API_URL, AGROSOFT_LINK} from '@env'
import axios from "axios";

const MyFarmsContext = createContext();

const MyFarmsProvider = ({children}) => {
    const [farms, setFarms] = useState([]);
    const [employeedFarms, setEmployeedFarms] = useState([]);
    const [error, setError] = useState(false);
    const [message, setMessage] = useState("");
    const [farm, setFarm]= useState([]);
    const [allFarms, setAllFarms] = useState([]);

    const LoadFarms = async (sorter, order, page) => {
        await axios.get(REACT_APP_API_URL + "/api/userfarms/"+ global.idUser + "/admin/"+ sorter + "/" + order + "/" + page)
          .then(res => {
            setFarms(res.data.response);
        })
    }
    const AddFarm = async (farmData) => {
        farmData.idUser = global.idUser;
        farmData.idRole = 1;
        await axios.post(REACT_APP_API_URL + "/api/saveuserfarm", farmData)
          .then(res => {
            console.log(res.data);
            setError(res.data.error)
            setMessage(res.data.response);
            LoadFarms("name_farm", "asc", 0);
            return res.data
        })
    }
    const UpdateFarm = async (farm1) => {
        await axios.put(REACT_APP_API_URL + "/api/modifyfarm/", farm1)
          .then(res => {
            setError(res.data.error)
            setMessage(res.data.response);
            LoadFarms("name_farm", "asc", 0);
        })
    }
    const DeleteFarm = async () => {
        await axios
          .put(`${REACT_APP_API_URL}/api/deletefarm`, { idFarm: global.idFarm })
          LoadFarms("name_farm", "asc", 0);
    };

    const LoadEmployeedFarms = async (sorter, order, page) => {
        await axios.get(REACT_APP_API_URL + "/api/userfarms/"+ global.idUser + "/employee/"+ sorter + "/" + order + "/" + page)
          .then(res => {
            setEmployeedFarms(res.data.response);
        })
    }

    const LoadAllFarms = async () => {
        await axios.get(REACT_APP_API_URL + "/api/listfarms/"+ global.idUser)
            .then(res => {
                setAllFarms(res.data.response);
            })
    }


    return (
        <MyFarmsContext.Provider 
            value={{
                LoadFarms,
                farms,
                AddFarm,
                UpdateFarm,
                message,
                error,
                setError,
                setMessage,
                DeleteFarm,
                farm,
                setFarm,
                LoadEmployeedFarms,
                employeedFarms,
                LoadAllFarms,
                allFarms
            }}>

            {children}
        </MyFarmsContext.Provider>
    )
    

};
export {MyFarmsProvider};
export default MyFarmsContext;
