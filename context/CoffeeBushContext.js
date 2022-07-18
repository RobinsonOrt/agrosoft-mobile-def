import global from "../global";
import React, { useState, createContext } from "react";
import { REACT_APP_API_URL, AGROSOFT_LINK } from "@env";
import axios from "axios";

const MyCoffeeBushContext = createContext();

const MyCoffeeBushProvider = ({ children }) => {
    const [coffeeBushs, setCoffeeBushs] = useState([]);
    const [coffeeBush, setCoffeeBush] = useState({});
    const [sorters, setSorters] = useState({"sorter": "created_date", "order": "asc", "page": 0});
    const [maxPage, setMaxPage] = useState(0);

    const GetCoffeeBushs = async (idCrop) => {
        const response = await axios.get(`${REACT_APP_API_URL}/api/coffeebush/${idCrop}/${sorters.sorter}/${sorters.order}/${sorters.page}`);
        setMaxPage(response.data.maxPage);
        setCoffeeBushs(response.data.response);
    }

    const CreateCoffeeBush = async (data) => {
        const response = await axios.post(`${REACT_APP_API_URL}/api/addcoffeebush`, data);
        console.log(response.data);
        GetCoffeeBushs(data.idCrop);
        return response;
    }

    const DeleteCoffeeBush = async (idCoffeeBush) => {
        const response = await axios.put(`${REACT_APP_API_URL}/api/deletecoffeebush/${idCoffeeBush}`);
        GetCoffeeBushs(global.idCrop);
        return response;
    }

    const GetBarCodeCoffeeBush = async (idCoffeeBush) => {
        const response = await axios.get(`${REACT_APP_API_URL}/api/getbarcode/${idCoffeeBush}`);
        return response;
    }

    const FindCoffeeBush = async (search, idCrop) => {
        const findCoffeeBushResponse = await axios.get(`${REACT_APP_API_URL}/api/findcoffeebushs/${idCrop}/${search}/0`);
        setMaxPage(0);
        setCoffeeBushs(findCoffeeBushResponse.data.response);
    }

    return(
        <MyCoffeeBushContext.Provider value={{
            coffeeBushs,
            setCoffeeBushs,
            coffeeBush,
            setCoffeeBush,
            sorters,
            setSorters,
            GetCoffeeBushs,
            CreateCoffeeBush,
            DeleteCoffeeBush,
            GetBarCodeCoffeeBush,
            FindCoffeeBush,
            maxPage,
        }}>{children}
        </MyCoffeeBushContext.Provider>
    )
}

export { MyCoffeeBushProvider };
export default MyCoffeeBushContext;