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
        const response = await axios.get(`${REACT_APP_API_URL}/coffeebush/${idCrop}/${sorters.sorter}/${sorters.order}/${sorters.page}`);
        setCoffeeBushs(response.data);
        console.log(response.data);
    }

    const CreateCoffeeBush = async (data) => {
        const response = await axios.post(`${REACT_APP_API_URL}/addcoffeebush`, data);
        console.log(response.data);
        GetCoffeeBushs(data.idCrop);
        return response;
    }

    const DeleteCoffeeBush = async (idCoffeeBush) => {
        const response = await axios.put(`${REACT_APP_API_URL}/deletecoffeebush/${idCoffeeBush}`);
        GetCoffeeBushs(global.idCrop);
        return response;
    }

    const GetBarCodeCoffeeBush = async (idCoffeeBush) => {
        const response = await axios.get(`${REACT_APP_API_URL}/getbarcode/${idCoffeeBush}`);
        return response;
    }

    const FindCoffeeBush = async (search, idCrop) => {
        const findCoffeeBushResponse = await axios.get(`${REACT_APP_API_URL}/findcoffeebush/${idCrop}/${search}/0`);
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
            FindCoffeeBush
        }}>{children}
        </MyCoffeeBushContext.Provider>
    )
}

export { MyCoffeeBushProvider };
export default MyCoffeeBushContext;