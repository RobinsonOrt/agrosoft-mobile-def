import global from "../global";
import React, { useState, createContext } from "react";
import { REACT_APP_API_URL, AGROSOFT_LINK } from "@env";
import axios from "axios";

const MyActivitiesContext = createContext();

const MyActivitiesProvider = ({ children }) => {
    const [activities, setActivities] = useState([]);
    const [activity, setActivity] = useState({});
    const [sorters, setSorters] = useState({"sorter": "name_activity", "order": "asc", "page": 0});
    const [maxPage, setMaxPage] = useState(0);

    const GetActivities = async (idActivityType, idFarm) => {
        const response = await axios.get(`${REACT_APP_API_URL}/getactivities/${idActivityType}/${idFarm}/${sorters.sorter}/${sorters.order}/${sorters.page}`);
        setActivities(response.data.response);
        setMaxPage(response.data.maxPage);
    }

    const CreateActivity = async (data) => {
        const response = await axios.post(`${REACT_APP_API_URL}/addactivity`, data);
        sorters.sorter = "created_date";
        sorters.order = "desc";
        GetActivities(data.idActivityType, data.idFarm);
        return response;
    }

    const UpdateActivity = async (data) => {
        const response = await axios.put(`${REACT_APP_API_URL}/updateactivity`, data);
        GetActivities(data.idActivityType, global.idFarm);
        return response;
    }

    const DeleteActivity = async (idActivity) => {
        const response = await axios.put(`${REACT_APP_API_URL}/deleteactivity/${idActivity}`);
        GetActivities(global.idActivityType, global.idFarm);
        return response;
    }
}