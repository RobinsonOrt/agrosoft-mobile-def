import global from "../global";
import React, { useState, createContext, useContext } from "react";
import {REACT_APP_API_URL, AGROSOFT_LINK} from '@env'
import axios from "axios";

const MySubRoleActivityContext = createContext();

const MySubRoleActivityProvider = ({children}) => {
    const [subRoleActivities, setSubRoleActivities] = useState([]);
    const [subRoleActivity, setSubRoleActivity] = useState({});
    const [sorters, setSorters] = useState({"sorter": "name_activity", "order": "asc", "page": 0});
    const [maxPage, setMaxPage] = useState(0);
    const [subRoleActivitiesToSet, setSubRoleActivitiesToSet] = useState({});

    const GetSubRoleActivities = async (idSubRole) => {
        const response = await axios.get(`${REACT_APP_API_URL}/api/activitiesbysubrole/${idSubRole}/${sorters.sorter}/${sorters.order}/${sorters.page}`);
        setMaxPage(response.data.maxPage);
        setSubRoleActivities(response.data.response);
    }

    const GetSubRoleActivitiesToSet = async (idSubRole) => {
        const response = await axios.get(`${REACT_APP_API_URL}/api/activitiestoset/${idSubRole}`);
        setSubRoleActivitiesToSet(response.data.response);
    }

    const AddSubRoleActivity = async (data) => {
        const response = await axios.post(`${REACT_APP_API_URL}/api/addactivitiestosubrole`, data);
        GetSubRoleActivities(data.idSubRole);
        GetSubRoleActivitiesToSet(data.idSubRole);
        return response;
    }

    const FindSubRoleActivities = async (search, idSubRole) => {
        const response = await axios.get(`${REACT_APP_API_URL}/api/findactivitiesbysubrole/${idSubRole}/${search}/0`);
        setMaxPage(0);
        setSubRoleActivities(response.data.response);
    }

    const DeleteSubRoleActivity = async (idActivity) => {
        const response = await axios.put(`${REACT_APP_API_URL}/api/deletesubroleactivity/${global.idSubRole}/${idActivity}`);
        GetSubRoleActivities(global.idSubRole);
        GetSubRoleActivitiesToSet(global.idSubRole);
        return response;
    }

    return(
        <MySubRoleActivityContext.Provider value={{
            subRoleActivities,
            setSubRoleActivities,
            subRoleActivity,
            setSubRoleActivity,
            sorters,
            setSorters,
            maxPage,
            setMaxPage,
            subRoleActivitiesToSet,
            setSubRoleActivitiesToSet,
            GetSubRoleActivities,
            GetSubRoleActivitiesToSet,
            AddSubRoleActivity,
            FindSubRoleActivities,
            DeleteSubRoleActivity
        }}>
            {children}
        </MySubRoleActivityContext.Provider>
    )
}

export { MySubRoleActivityProvider };
export default MySubRoleActivityContext;