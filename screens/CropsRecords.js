import React, { useContext, useEffect, useState } from "react";
import global from "../global";
import {
  ScrollView,
  TouchableOpacity,
  View,
  Text,
  TextInput,
  Button,
} from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import CleanButton from "../components/CleanButton";
import PickerSorter from "../components/PickerSorter";
import SearchByName from "../components/SearchByName";
import SubHeader from "../components/SubHeader";
import tw from "twrnc";
import axios from "axios";
import useSWR, { mutate } from "swr";
import { useBackHandler } from "@react-native-community/hooks";
import { useNavigate, useParams } from "react-router-native";
import MyFarmsContext from "../context/FarmContext";
import { Link } from "react-router-native";
import { REACT_APP_API_URL, AGROSOFT_LINK } from "@env";
import ModalInfoEmployeeCrop from "../components/ModalInfoEmployeeCrop";
import DatePicker from "react-native-datepicker";

export default function CropsRecords() {
  const {
    setModalVisible,
    modalVisible,
    setIdCrop,
    submitResponse,
    setSubmitResponse,
  } = useContext(MyFarmsContext);

  const { idActivity } = useParams();

  let navigate = useNavigate();

  const fetcher = (url) => axios.get(url).then((res) => res.data);

  const [orderCropRecords, setOrderCropRecords] = useState([
    "created_date",
    "asc",
  ]);

  const [pageIndex, setPageIndex] = useState(0);
  const { data: cropRecords } = useSWR(
    `${REACT_APP_API_URL}/api/recordsbyactivity/${idActivity}/${global.idCrop}/${orderCropRecords[0]}/${orderCropRecords[1]}/${pageIndex}`,
    fetcher
  );

  const { data: recordsFields } = useSWR(
    `${REACT_APP_API_URL}/api/getallfieldsbyactivity/${idActivity}`,
    fetcher
  );

  const noData =
    cropRecords?.maxPage == null || cropRecords?.maxPage == pageIndex;
  const pageLength = cropRecords?.maxPage + 1;

  useBackHandler(() => {
    console.log("back");
    navigate("/");
    return true;
  });

  const [date, setDate] = useState(new Date());
  const inputText = [];
  const inputNumber = [];
  const inputDate = [];

  return (
    <SafeAreaProvider>
      <SafeAreaView style={tw`mt-0 pt-0 flex`}>
        <SubHeader title={"Registros"} />
        <ScrollView contentContainerStyle={tw`py-5 pb-40 px-5`}>
          <View style={tw`flex my-5 flex-row justify-between`}>
            <View style={tw` flex-1`}>
              <SearchByName
              //data={farms} key="nameFarm" setData={setFilter}
              />
              <CleanButton />
            </View>
            <View style={tw`flex flex-col items-end flex-1`}>
              <PickerSorter
              //list={data}
              //key1="nameFarm"
              //key2="createdDate"
              //newList={setFilter}
              />
              <TouchableOpacity
                style={tw`p-2 bg-green-500 mt-1 rounded-md`}
                onPress={() => {
                  setModalVisible(true);
                }}
              >
                <Text style={tw`text-white`}>Agregar registro</Text>
              </TouchableOpacity>
            </View>
          </View>
          {cropRecords?.response?.length > 0 ? (
            cropRecords?.response?.map((item, index) => (
              <View key={index} style={tw`bg-[#205400]/10 rounded-md my-6 p-5`}>
                <View
                  style={tw`pb-5 flex items-center border-b border-[#205400]/10`}
                >
                  <Text style={tw`font-bold text-lg`}>{item.nameCard}</Text>
                </View>
                <View>
                  <Text style={tw`text-center my-5`}>
                    {item.idBushOrIdCrop}
                  </Text>
                </View>
                {item.fields.map((field, index) => (
                  <View key={index} style={tw`flex flex-col my-3`}>
                    <View style={tw`bg-[#205400]/10 p-2 rounded-md  p-5`}>
                      <Text style={tw`text-start font-bold`}>
                        Nombre:{" "}
                        <Text style={tw`font-normal`}>{field.nameField}</Text>
                      </Text>
                      <Text style={tw`text-start font-bold`}>
                        Record:{" "}
                        <Text style={tw`font-normal`}>{field.dataRecord}</Text>
                      </Text>
                    </View>
                  </View>
                ))}
              </View>
            ))
          ) : (
            <View style={tw`text-center w-full`}>
              <Text>No se encontraron datos</Text>
            </View>
          )}
          <View style={tw`flex flex-row items-center justify-center mt-5`}>
            <TouchableOpacity
              style={tw`bg-green-500 p-2 rounded-md mr-3 ${
                pageIndex <= 0 ? "hidden" : ""
              }`}
              onPress={() => {
                setPageIndex(pageIndex - 1);
              }}
            >
              <Text style={tw`text-white text-lg`}>Volver</Text>
            </TouchableOpacity>
            {Array.from({ length: pageLength }).map((_, i) => (
              <TouchableOpacity
                key={i}
                style={tw`bg-gray-300 w-10 h-10 flex items-center justify-center ${
                  i == pageIndex ? "bg-gray-400" : ""
                }`}
                onPress={() => setPageIndex(i)}
              >
                <Text style={tw`text-lg font-normal`}>{i + 1}</Text>
              </TouchableOpacity>
            ))}
            <TouchableOpacity
              style={tw`bg-green-500 p-2 rounded-md ml-3 ${
                noData ? "hidden" : ""
              }`}
              onPress={() => {
                setPageIndex(pageIndex + 1);
              }}
            >
              <Text style={tw`text-white text-lg`}>Siguiente</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
        <ModalInfoEmployeeCrop
          modalBody={
            <View>
              {!submitResponse ? (
                <View>
                  {recordsFields?.response.length !== 0 ? (
                    recordsFields?.response.map(
                      (field, index) => (
                        Array.from({
                          length: field.idDataType === "2",
                        }).forEach(() => inputNumber.push("")),
                        Array.from({
                          length: field.idDataType === "3",
                        }).forEach(() => inputText.push("")),
                        Array.from({
                          length: field.idDataType === "1",
                        }).forEach(() => inputDate.push("")),
                        (
                          <View
                            key={index}
                            style={tw`bg-[#205400]/10 p-2 rounded-md  p-5 mb-5`}
                          >
                            <Text style={tw`text-start font-bold`}>
                              Nombre:{" "}
                              <Text style={tw`font-normal`}>
                                {field.nameField}
                              </Text>
                            </Text>
                            <Text style={tw`text-start font-bold`}>
                              Descripción:{" "}
                              <Text style={tw`font-normal`}>
                                {field.descriptionField}
                              </Text>
                            </Text>

                            {field.idDataType === "1" ? (
                              <DatePicker
                                date={date}
                                onDateChange={(date) =>
                                  (inputDate[index] = {
                                    idField: field.idField,
                                    dataRecord: date,
                                  })
                                }
                                onConfirm={
                                  (inputDate[index] = {
                                    idField: field.idField,
                                    dataRecord: date,
                                  })
                                }
                                customStyles={{
                                  dateIcon: {
                                    position: "absolute",
                                    left: 0,
                                    top: 0,
                                    marginLeft: 0,
                                    marginTop: 15,
                                  },
                                  dateInput: {
                                    marginLeft: 36,
                                    marginTop: 20,
                                    borderRadius: 5,
                                    borderColor: "#205400",
                                  },
                                }}
                                mode="date"
                              />
                            ) : field.idDataType === "2" ? (
                              <TextInput
                                onChangeText={(newNumber) =>
                                  (inputNumber[index] = {
                                    idField: field.idField,
                                    dataRecord: newNumber,
                                  })
                                }
                                value={inputNumber}
                                numeric
                                keyboardType="numeric"
                                style={tw`border border-[#205400] px-3 rounded-md mt-3`}
                              />
                            ) : field.idDataType === "3" ? (
                              <TextInput
                                onChangeText={(newText) =>
                                  (inputText[index] = {
                                    idField: field.idField,
                                    dataRecord: newText,
                                  })
                                }
                                value={inputText}
                                style={tw`border border-[#205400] px-3 rounded-md mt-3`}
                              />
                            ) : null}
                          </View>
                        )
                      )
                    )
                  ) : (
                    <View>
                      <Text style={tw`text-lg mb-5 text-center`}>
                        No se encontraron campos
                      </Text>
                    </View>
                  )}
                  {recordsFields?.response.length !== 0 && (
                    <TouchableOpacity
                      title="Submit"
                      style={tw`bg-green-500 p-3 items-center text-center rounded-md mb-3`}
                      onPress={async () => {
                        const jsonText = JSON.parse(JSON.stringify(inputText));
                        const jsonNumber = JSON.parse(
                          JSON.stringify(inputNumber)
                        );
                        const jsonDate = JSON.parse(JSON.stringify(inputDate));

                        const jsonTextClean = jsonText.filter(Boolean);
                        const jsonNumberClean = jsonNumber.filter(Boolean);
                        const jsonDateClean = jsonDate.filter(Boolean);
                        const data = [
                          ...jsonTextClean,
                          ...jsonNumberClean,
                          ...jsonDateClean,
                        ];

                        await axios
                          .post(`${REACT_APP_API_URL}/api/addrecord`, {
                            idBushOrIdCrop: global.idCrop,
                            idActivity: idActivity,
                            idEmployee: global.idUser,
                            idFarm: global.idFarm,
                            fields: data,
                          })
                          .then((res) => setSubmitResponse(res.data.response))
                          .catch((err) => console.log(err.response));
                        mutate(
                          `${REACT_APP_API_URL}/api/recordsbyactivity/${idActivity}/${
                            global.idCrop
                          }/${orderCropRecords[0]}/${orderCropRecords[1]}/${0}`
                        );
                      }}
                    >
                      <Text style={tw`text-white`}>Aceptar</Text>
                    </TouchableOpacity>
                  )}
                </View>
              ) : (
                <View>
                  <Text style={tw`text-lg mb-5 text-center`}>
                    {submitResponse}
                  </Text>
                </View>
              )}
            </View>
          }
        />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
