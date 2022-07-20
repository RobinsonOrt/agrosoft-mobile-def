import global from "../global";
import React, { useState, createContext, useEffect } from "react";
import { REACT_APP_API_URL, AGROSOFT_LINK } from "@env";
import axios from "axios";
import useSWR from "swr";

const MyFarmsContext = createContext();

const MyFarmsProvider = ({ children }) => {
  const [farms, setFarms] = useState([]);
  const [employeedFarms, setEmployeedFarms] = useState([]);
  const [error, setError] = useState(false);
  const [message, setMessage] = useState("");
  const [farm, setFarm] = useState([]);
  const [allFarms, setAllFarms] = useState([]);
  const [sorters, setSorters] = useState({
    sorter: "name_farm",
    order: "asc",
    page: 0,
  });
  const [maxPage, setMaxPage] = useState(0);
  const [idCrop, setIdCrop] = useState("");
  const [idFarm, setIdFarm] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  const [submitResponse, setSubmitResponse] = useState("");

  const LoadFarms = async () => {
    await axios
      .get(
        REACT_APP_API_URL +
          "/api/userfarms/" +
          global.idUser +
          "/admin/" +
          sorters.sorter +
          "/" +
          sorters.order +
          "/" +
          sorters.page
      )
      .then((res) => {
        setFarms(res.data.response);
        setMaxPage(res.data.maxPage);
      });
  };
  const AddFarm = async (farmData) => {
    farmData.idUser = global.idUser;
    farmData.idRole = 1;
    await axios
      .post(REACT_APP_API_URL + "/api/saveuserfarm", farmData)
      .then((res) => {
        setError(res.data.error);
        setMessage(res.data.response);
        sorters.sorter = "created_date";
        sorters.order = "desc";
        LoadFarms();
        return res.data;
      });
  };
  const UpdateFarm = async (farm1) => {
    await axios
      .put(REACT_APP_API_URL + "/api/modifyfarm/", farm1)
      .then((res) => {
        setError(res.data.error);
        setMessage(res.data.response);
        LoadFarms();
      });
  };
  const DeleteFarm = async (idFarm) => {
    await axios.put(`${REACT_APP_API_URL}/api/deletefarm`, { idFarm: idFarm });
    LoadFarms();
  };

  const FindFarms = async (search) => {
    await axios
      .get(
        REACT_APP_API_URL +
          "/api/findfarms/" +
          global.idUser +
          "/admin/" +
          search +
          "/0"
      )
      .then((res) => {
        setMaxPage(0);
        setFarms(res.data.response);
        console.log(res);
      });
  };

  const LoadEmployeedFarms = async (sorter, order, page) => {
    await axios
      .get(
        REACT_APP_API_URL +
          "/api/userfarms/" +
          global.idUser +
          "/employee/" +
          sorter +
          "/" +
          order +
          "/" +
          page
      )
      .then((res) => {
        setEmployeedFarms(res.data.response);
      });
  };

  const LoadAllFarms = async () => {
    await axios
      .get(REACT_APP_API_URL + "/api/listfarms/" + global.idUser)
      .then((res) => {
        setAllFarms(res.data.response);
      });
  };

  const data = {
    submitResponse,
    setSubmitResponse,
    LoadFarms,
    farms,
    AddFarm,
    UpdateFarm,
    message,
    error,
    setError,
    setMessage,
    DeleteFarm,
    farm,
    setFarm,
    LoadEmployeedFarms,
    employeedFarms,
    LoadAllFarms,
    allFarms,
    sorters,
    setSorters,
    maxPage,
    setMaxPage,
    FindFarms,
    idCrop,
    setIdCrop,
    modalVisible,
    setModalVisible,
    idFarm,
    setIdFarm,
  };

  return (
    <MyFarmsContext.Provider value={data}>{children}</MyFarmsContext.Provider>
  );
};
export { MyFarmsProvider };
export default MyFarmsContext;
