import global from "../global";
import React, { useState, createContext } from "react";
import { REACT_APP_API_URL, AGROSOFT_LINK } from "@env";
import axios from "axios";

const MyFieldsContext = createContext();

const MyFieldsProvider = ({ children }) => {
    const [fields, setFields] = useState([]);
    const [field, setField] = useState({idDataType : 0});
    const [dataTypes, setDataTypes] = useState([{dataType:"", idDataType:0}]);
    const [sorters, setSorters] = useState({"sorter": "name_field", "order": "asc", "page": 0});
    const [maxPage, setMaxPage] = useState(0);

    const GetFields = async (idActivity) => {
        const response = await axios.get(`${REACT_APP_API_URL}/api/getfields/${idActivity}/${sorters.sorter}/${sorters.order}/${sorters.page}`);
        setFields(response.data.response);
        setMaxPage(response.data.maxPage);
    }

    const CreateField = async (data) => {
        const response = await axios.post(`${REACT_APP_API_URL}/api/addfield`, data);
        sorters.sorter = "created_date";
        sorters.order = "desc";
        GetFields(data.idActivity);
        return response;
    }

    const GetDataTypes = async () => {
        const response = await axios.get(`${REACT_APP_API_URL}/api/datatypes`);
        //console.log(response.data.response);
        setDataTypes(response.data);
    }

    const UpdateField = async (data) => {
        const response = await axios.put(`${REACT_APP_API_URL}/api/updatefield`, data);
        GetFields(global.idActivity);
        return response;
    }

    const DeleteField = async (idField) => {
        const response = await axios.put(`${REACT_APP_API_URL}/api/deletefield/${idField}`);
        GetFields(global.idActivity);
        return response;
    }

    const FindFields = async (search, idActivity) => {
        const response = await axios.get(`${REACT_APP_API_URL}/api/findfields/${idActivity}/${search}/0`);
        setMaxPage(0);
        setFields(response.data.response);
    }

    return(
        <MyFieldsContext.Provider value={{
            fields,
            setFields,
            field,
            setField,
            dataTypes,
            setDataTypes,
            sorters,
            setSorters,
            maxPage,
            setMaxPage,
            GetFields,
            CreateField,
            GetDataTypes,
            UpdateField,
            DeleteField,
            FindFields
        }}>{children}
        </MyFieldsContext.Provider>
    )
}
export { MyFieldsProvider }
export default MyFieldsContext;