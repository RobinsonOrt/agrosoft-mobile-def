import global from "../global";
import React, { useState, createContext } from "react";
import { REACT_APP_API_URL, AGROSOFT_LINK } from "@env";
import axios from "axios";


const MyCropsContext = createContext();

const MyCropsProvider = ({ children }) => {
    const [crops, setCrops] = useState([]);
    const [crop, setCrop] = useState({});
    const [sorters, setSorters] = useState({"sorter": "name_crop", "order": "asc", "page": 0});
    const [maxPage, setMaxPage] = useState(0);
    const [coffeeBushCount, setCoffeeBushCount] = useState(0);

    const GetCrops = async (idFarm) => {
        const res = await axios.get(`${REACT_APP_API_URL}/api/crops/${idFarm}/${sorters.sorter}/${sorters.order}/${sorters.page}`);
        setCrops(res.data.response);
        setMaxPage(res.data.maxPage);
    }

    const CreateCrop = async (data, cantBush) => {
        const res = await axios.post(`${REACT_APP_API_URL}/api/addcrop/${cantBush}`, data);
        sorters.sorter = "created_date";
        sorters.order = 'desc';
        GetCrops(data.idFarm);
        return res;
    }

    const UpdateCrop = async (data) => {
        const res = await axios.put(`${REACT_APP_API_URL}/api/updatecrop`, data);
        GetCrops(data.idFarm);
        return res;
    }

    const DeleteCrop = async (idCrop) => {
        const res = await axios.put(`${REACT_APP_API_URL}/api/deletecrop/${idCrop}`);
        GetCrops(global.idFarm);
        return res;
    }

    const GetBarCodeCrops = async (idCrop) => {
        const GetBarCodeCropsResponse = await axios.get(`${REACT_APP_API_URL}/api/getallbarcodes/${idCrop}`);
        return GetBarCodeCropsResponse;
    }

    const FindCrops = async (search, idFarm) => {
        const FindCropsResponse = await axios.get(`${REACT_APP_API_URL}/api/findcrops/${idFarm}/${search}/0`);
        setMaxPage(0);

        setCrops(FindCropsResponse.data.response);
    }

    const GetCrop = async (idCrop) => {
        const getCropResponse = await axios.get(`${REACT_APP_API_URL}/api/crop/${idCrop}`);
        setCoffeeBushCount(getCropResponse.data.coffeeBushCount);
        setCrop(getCropResponse.data.response);
        return getCropResponse;
    }

    return (
        <MyCropsContext.Provider value={{
            crops,
            setCrops,
            crop,
            setCrop,
            GetCrops,
            sorters,
            CreateCrop,
            UpdateCrop,
            DeleteCrop,
            maxPage,
            GetBarCodeCrops,
            FindCrops,
            GetCrop,
            coffeeBushCount,
        }}>{children}
        </MyCropsContext.Provider>
    )
}
export { MyCropsProvider };
export default MyCropsContext;