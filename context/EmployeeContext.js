import global from "../global";
import React, { useState, createContext, useContext } from "react";
import {REACT_APP_API_URL, AGROSOFT_LINK} from '@env'
import axios from "axios";
import MyFarmsContext from "./FarmContext";

const MyEmployeesContext = createContext();

const MyEmployeesProvider = ({children}) => {
    const [employees, setEmployees] = useState([]);
    const [error, setError] = useState(false);
    const [message, setMessage] = useState("");
    const [employee, setEmployee]= useState([]);
    const [sorters, setSorters] = useState({"sorter": "name", "order": "asc", "page": 0});
    const [maxPage, setMaxPage] = useState(0);

    const { LoadEmployeedFarms } = useContext(MyFarmsContext);

    const LoadEmployees = async () => {
        await axios.get(REACT_APP_API_URL + "/api/employees/"+ global.idFarm + "/" + sorters.sorter + "/" + sorters.order + "/" + sorters.page)
          .then(res => {
            setEmployees(res.data.response);
            setMaxPage(res.data.maxPage);
            console.log(res.data.response)
        })
    }

    const ChangeLabor = async (data) => {
        
        await axios.post(REACT_APP_API_URL + "/api/addsubroleuser", data)
          .then(res => {
            console.log(res.data);
            setError(res.data.error)
            setMessage(res.data.response);
            LoadEmployees("name", "asc", 0);
        })
    }

    const DeleteEmployee = async (data) => {
        await axios.put(REACT_APP_API_URL + "/api/deleteemployee", data)
            .then(res => {
                setError(res.data.error)
                setMessage(res.data.response);
                LoadEmployees("name", "asc", 0);
            })

    }

    const LeaveFarm = async (idUser, idFarm) => {
        const data = {};
        data.idUser = idUser;
        data.idFarm = idFarm;
        console.log("data", data);
        await axios.put(`${REACT_APP_API_URL}/api/deleteemployee`, data)
            .then(res => {
                console.log(res.data);
                setError(res.data.error)
                setMessage(res.data.response);
                LoadEmployeedFarms("name_farm", "asc", 0);
            })
    }

    return (
        <MyEmployeesContext.Provider
            value={{
                LoadEmployees,
                employees,
                message,
                error,
                setError,
                setMessage,
                employee,
                setEmployee,
                ChangeLabor,
                DeleteEmployee,
                LeaveFarm,
                sorters,
                setSorters,
                maxPage,
                setMaxPage
            }}
        >
            {children}
        </MyEmployeesContext.Provider>
    )
}
export { MyEmployeesProvider };
export default MyEmployeesContext;