import global from "../global";
import React, { useState, createContext } from "react";
import { REACT_APP_API_URL, AGROSOFT_LINK } from "@env";
import axios from "axios";

const MyIdentifierContext = createContext();

const MyIdentifierProvider = ({ children }) => {
  const [identifiers, setIdentifiers] = useState([]);
  const [identifier, setIdentifier] = useState({idIdentifier : "0", countryName:"", identifier:"0"});
  const [actualIdentifier, setActualIdentifier] = useState();

  const LoadIdentifiers = async () => {
    await axios.get(`${REACT_APP_API_URL}/api/identifiers`)
        .then((response) => {
        setIdentifiers(response.data);
    });
  };

  const getIdentifier = async (idIdentifier) => {
      const identifierResponse = await axios .get(`${REACT_APP_API_URL}/api/identifier/${idIdentifier}`)
      setIdentifier(identifierResponse.data.response);
      setActualIdentifier(identifierResponse.data.response.idIdentifier);
      //console.log(identifierResponse.data.response);
      return identifierResponse;
    }
  return (
    <MyIdentifierContext.Provider value={{
        identifiers,
        LoadIdentifiers,
        getIdentifier,
        identifier,
        setIdentifier,
        actualIdentifier,
        setActualIdentifier
    }}>
      {children}
    </MyIdentifierContext.Provider>
  );
};
export { MyIdentifierProvider };
export default MyIdentifierContext;
