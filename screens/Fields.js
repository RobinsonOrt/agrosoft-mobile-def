import global from "../global";
import React, { useState, useEffect, useContext } from "react";
import { View, Text, Image, TouchableOpacity, BackHandler, ScrollView, TextInput } from "react-native";
import tw from "twrnc";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import SubHeader from "../components/SubHeader";
import { styles } from "./Farms";
import MyFieldsContext from "../context/FieldsContext";
import Pagination from "../components/Pagination";
import SorterComponent from "../components/SorterComponent";
import SearchComponent from "../components/SearchComponent";
import Delete from "../assets/delete.png"
import Edit from "../assets/edit.png";
import AddButton from "../components/AddButton";
import ModalDelete from "../components/ModalDelete";
import { Cart } from "../components/Cart";
import CartButton from "../components/CartButton";
import ModalAddField from "../components/ModalAddField";
import ModalModifyField from "../components/ModalModifyField";

const Fields = ({ navigation }) => {
    const [isModalOpenAddField, setIsModalOpenAddField] = useState(false);
    const [isModalOpenDelete, setIsModalOpenDelete] = useState(false);
    const [isModalOpenModifyField, setIsModalOpenModifyField] = useState(false);

    const { GetFields, fields, sorters, maxPage, FindFields, DeleteField, GetDataTypes, setField } = useContext(MyFieldsContext);

    useEffect(() => {
        GetFields(global.idActivity);
        GetDataTypes();
    }, []);
    return(
        <SafeAreaProvider>
            <SafeAreaView style={styles.safeArea}>
                <SubHeader title={"Campos"} />
                <ScrollView>
                    <View style={styles.container}>
                        <View style={tw`flex-row justify-between`}>
                            <View style={tw``}>
                                <SorterComponent sorters={sorters} sorter={"name_field"} GetElements={GetFields} firstParameter={global.idActivity} />
                            </View>
                            <View style={tw`items-end`}>
                                <SearchComponent GetElements={FindFields} GetOriginalElements={GetFields} secondParameter={global.idActivity} />
                                <AddButton onPress={() => setIsModalOpenAddField(!isModalOpenAddField)} />
                            </View>
                        </View>

                        <ModalAddField
                            isModalOpenAddField={isModalOpenAddField}
                            setIsModalOpenAddField={setIsModalOpenAddField}
                        />

                        <ModalModifyField
                            isModalOpenModifyField={isModalOpenModifyField}
                            setIsModalOpenModifyField={setIsModalOpenModifyField}
                        />

                        <ModalDelete
                            isModalOpenDelete={isModalOpenDelete}
                            setIsModalOpenDelete={setIsModalOpenDelete}
                            DeleteFunction={DeleteField}
                        />

                        <View style={tw`mt-2`}>
                        {fields.length > 0 ?(
                            fields.map((field, index) => {
                                return(
                                    <Cart key={index} name={field.nameField} description={field.descriptionField} id={(field.idDataType == 1)? "Fecha" : (field.idDataType == 2) ? "Numero" : "Texto"}>
                                        <CartButton text={"Editar"} onPress={() => {setField(field), setIsModalOpenModifyField(!isModalOpenModifyField)}} color={"#F8BD23"} image={Edit} />
                                        <CartButton text={"Eliminar"} onPress={() => {global.idToDelete = field.idField, setIsModalOpenDelete(!isModalOpenDelete)}} color={"#EF4444"} image={Delete} />
                                    </Cart>
                                )
                            })
                        ): (<Text style={tw`text-center text-gray-500 my-5`}>No se encontraron resultados</Text>)}
                        </View>
                        <Pagination maxPage={maxPage} sorters={sorters} GetElements={GetFields} firstParameter={global.idActivity}/>
                    </View>
                </ScrollView>
            </SafeAreaView>
        </SafeAreaProvider>
    )
}


export default Fields;