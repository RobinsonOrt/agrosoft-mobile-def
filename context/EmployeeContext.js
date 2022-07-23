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
    const [selectedUserRole, setSelectedUserRole] = useState("0");

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
            LoadEmployees();
        })
    }

    const DeleteEmployee = async (idUser) => {
        const data = {};
        data.idUser = idUser;
        data.idFarm = global.idFarm;
        await axios.put(REACT_APP_API_URL + "/api/deleteemployee", data)
            .then(res => {
                setError(res.data.error)
                setMessage(res.data.response);
                LoadEmployees();
            })
    }

    const LeaveFarm = async (idFarm) => {
        const data = {};
        data.idUser = global.idUser;
        data.idFarm = idFarm;
        console.log("data", data);
        await axios.put(`${REACT_APP_API_URL}/api/deleteemployee`, data)
            .then(res => {
                setError(res.data.error)
                setMessage(res.data.response);
                LoadEmployeedFarms();
            })
    }

    const FindEmployees = async (search) => {
        const response = await axios.get(REACT_APP_API_URL + "/api/findemployees/"+ global.idFarm + "/" + search + "/0");
        setMaxPage(0);
        setEmployees(response.data.response);
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
                setMaxPage,
                FindEmployees,
                selectedUserRole,
                setSelectedUserRole
            }}
        >
            {children}
        </MyEmployeesContext.Provider>
    )
}
export { MyEmployeesProvider };
export default MyEmployeesContext;