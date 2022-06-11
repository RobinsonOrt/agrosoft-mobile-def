import global from "../global";
import React, { useState, createContext } from "react";
import { REACT_APP_API_URL, AGROSOFT_LINK } from "@env";
import axios from "axios";

const CountryContext = createContext();

const CountryProvider = ({ children }) => {
  const [country, setCountry] = useState([]);
  const loadCountries = async () => {
    await axios.get(`${REACT_APP_API_URL}/api/countries`).then((response) => {
      setCountry(response.data);
    });
  };
  return (
    <CountryContext.Provider value={{ country, setCountry, loadCountries }}>
      {children}
    </CountryContext.Provider>
  );
};
export { CountryProvider };
export default CountryContext;
