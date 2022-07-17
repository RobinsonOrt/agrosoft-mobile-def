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

    const GetCrops = async (idFarm) => {

        console.log(sorters)
        const res = await axios.get(`${REACT_APP_API_URL}/api/crops/${idFarm}/${sorters.sorter}/${sorters.order}/${sorters.page}`);
        setCrops(res.data.response);
        setMaxPage(res.data.maxPage);
        console.log(res.data.response);
    }

    const CreateCrop = async (data, cantBush) => {
        const res = await axios.post(`${REACT_APP_API_URL}/api/addcrop/${cantBush}`, data);
        console.log(res.data.response);
        GetCrops(data.idFarm);
        return res;
    }

    const UpdateCrop = async (data) => {
        const res = await axios.put(`${REACT_APP_API_URL}/api/updatecrop`, data);
        console.log(res.data.response);
        GetCrops(data.idFarm);
        return res;
    }

    const DeleteCrop = async (idCrop) => {
        const res = await axios.put(`${REACT_APP_API_URL}/api/deletecrop/${idCrop}`);
        console.log(res.data.response);
        GetCrops(global.idFarm);
        return res;
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
            maxPage
        }}>{children}
        </MyCropsContext.Provider>
    )
}
export { MyCropsProvider };
export default MyCropsContext;