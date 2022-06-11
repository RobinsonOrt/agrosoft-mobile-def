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

    const { LoadEmployeedFarms } = useContext(MyFarmsContext);

    const LoadEmployees = async (sorter, order, page) => {
        await axios.get(REACT_APP_API_URL + "/api/employees/"+ global.idFarm + "/" + sorter + "/" + order + "/" + page)
          .then(res => {
            setEmployees(res.data.response);
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
                LeaveFarm
            }}
        >
            {children}
        </MyEmployeesContext.Provider>
    )
}
export { MyEmployeesProvider };
export default MyEmployeesContext;