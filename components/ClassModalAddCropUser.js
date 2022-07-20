import global from "../global";
import React, { Component, useContext, useState, useEffect } from "react";
import Checkbox from "expo-checkbox";

import {
    View,
    Text,
    TextInput,
    ScrollView,
    TouchableOpacity,
    Picker,
    Modal,
    FlatList
} from "react-native";
import { styles } from "../screens/Farms";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

import tw from "twrnc";
import MyCropUserContext from "../context/CropUserContext";
import SubHeader from "../components/SubHeader";
import ButtonCard from "./ButtonCard";
import { MaterialIcons, Ionicons } from '@expo/vector-icons';

export default class ClassModalAddCropUser extends Component{
    static contextType = MyCropUserContext;
    constructor(props) {
        super(props);
        
        this.state = {
            noFormatData: [],
            data: [],
            selectedCrops: [],
            nav: props.navigation,
        }
        /* const comeBack = () => {
            this.props.navigation.goBack();
        }

        if(this.state.ready){
            comeBack()
        } */
        
    }

    componentDidMount() {
        this.setState({noFormatData: this.context.cropsToSet})
        let Temp = this.context.cropsToSet
        let FormData = []
        for (let i = 0; i < Temp.length; i++) {
            FormData.push({
                id: Temp[i].idCrop,
                key: Temp[i],
                checked: false
            })
        }
        this.setState({ data: FormData })
    }

    onSubmitCrops = async () => {
        var keys = this.state.data.map(t => t.key.idCrop)
        var checks = this.state.data.map(t => t.checked)
        let Selected = []
        for (let i = 0; i < checks.length; i++) {
            if (checks[i]) {
                Selected.push(keys[i])
            }
        }
        const { AddCropUser } = this.context;
        const dataToSend = {}
        dataToSend.idUser = global.idEmployee
        dataToSend.idFarm = global.idFarm
        dataToSend.idCrops = Selected.toString()
        const response = await AddCropUser(dataToSend);
        if(response.data.error){
            alert(response.data.error)
        }
        else{
            const navigation = this.state.nav
            navigation.goBack()
        }
    }
    onCancel(){
        const navigation = this.state.nav
        navigation.goBack()
    }

    onChecked(idCrop){
        
        const data = this.state.data
        const index = data.findIndex(x => x.id === idCrop)
        data[index].checked = !data[index].checked
        this.setState(data)
    }

    renderCropsToSet(){
        return (this.state.data.length > 0) ? ( this.state.data.map((item, key) => {
            return(
                <TouchableOpacity style={tw`flex-row m-2 items-center`} key={key} onPress={()=>this.onChecked(item.key.idCrop)}>
                    <Checkbox
                    style={tw`m-1 w-5 h-5`}
                    value={item.checked}
                    onValueChange={() => this.onChecked(item.key.idCrop)}
                    />
                    <Text style={tw`content-center w-full uppercase`}>{item.key.nameCrop}</Text>
                </TouchableOpacity>
            )
        })) : (<Text style={tw`text-center text-gray-500 my-5`}>
        No se encontraron registros
      </Text>)
    }

    render(){
        return(
            <SafeAreaProvider>
                <SafeAreaView style={tw`flex-1`}>
                    <SubHeader title={"Seleccione los cultivos a asignar"} />
                    <View style={tw`m-3 w-full flex-row justify-around`}>
                    <ButtonCard text={"Asignar"} onPress={()=>this.onSubmitCrops()} color={"rgba(34, 197, 94, 1)"} icon={<MaterialIcons name="assignment-ind" size={20} color="white" />} />
                    <ButtonCard text={"Cancelar"} onPress={()=>this.onCancel()} color={"rgba(239, 68, 68, 1)"} icon={<Ionicons name="ios-arrow-back-circle-outline" size={20} color="white" />} />
                    </View>
                    
                    <ScrollView style={tw`h-95%`} >
                        <View style={styles.container}>
                        {this.renderCropsToSet()}
                        </View>
                    </ScrollView>
                </SafeAreaView>
            </SafeAreaProvider>
        )
    }
    
}