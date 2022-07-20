import global from "../global";
import React, { useState, createContext, useContext } from "react";
import {REACT_APP_API_URL, AGROSOFT_LINK} from '@env'
import axios from "axios";

const MyCropUserContext = createContext();

const MyCropUserProvider = ({children}) => {
    const [cropUsers, setCropUsers] = useState([]);
    const [cropUser, setCropUser] = useState({});
    const [sorters, setSorters] = useState({"sorter": "name_crop", "order": "asc", "page": 0});
    const [maxPage, setMaxPage] = useState(0);
    const [cropsToSet, setCropsToSet] = useState({});

    const GetCropUsers = async (idEmployee) => {
        const response = await axios.get(`${REACT_APP_API_URL}/api/getcropusers/${global.idFarm}/${idEmployee}/${sorters.sorter}/${sorters.order}/${sorters.page}`);
        setMaxPage(response.data.maxPage);
        setCropUsers(response.data.response);
    }

    const GetCropsToSet = async (idEmployee) => {
        const response = await axios.get(`${REACT_APP_API_URL}/api/cropstoset/${idEmployee}/${global.idFarm}`);
        console.log(response.data)
        setCropsToSet(response.data.response);
    }

    const AddCropUser = async (data) => {
        const response = await axios.post(`${REACT_APP_API_URL}/api/addcropuser`, data);
        GetCropUsers(data.idUser);
        GetCropsToSet(data.idUser);
        return response;
    }

    const FindCropUsers = async (search, idUser) => {
        const response = await axios.get(`${REACT_APP_API_URL}/api/findcropusers/${global.idFarm}/${idUser}/${search}/0`);
        setMaxPage(0);
        setCropUsers(response.data.response);
    }

    const DeleteCropUser = async (data) => {
        const response = await axios.put(`${REACT_APP_API_URL}/api/deletecropuser`, data);
        GetCropUsers(data.idUser);
        GetCropsToSet(data.idUser);
        return response;
    }

    return(
        <MyCropUserContext.Provider value={{
            cropUsers,
            setCropUsers,
            cropUser,
            setCropUser,
            sorters,
            setSorters,
            maxPage,
            setMaxPage,
            cropsToSet,
            setCropsToSet,
            GetCropUsers,
            AddCropUser,
            FindCropUsers,
            DeleteCropUser,
            GetCropsToSet
        }}>{children}
        </MyCropUserContext.Provider>

    )

}

export { MyCropUserProvider }
export default MyCropUserContext;