import global from "../global";
import React, { Component, useContext, useState, useEffect } from "react";
import Checkbox from "expo-checkbox";

import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
} from "react-native";

import { styles } from "../screens/Farms";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

import tw from "twrnc";
import MySubRoleActivityContext from "../context/SubRoleActivityContext";
import SubHeader from "../components/SubHeader";
import ButtonCard from "./ButtonCard";
import { MaterialIcons, Ionicons } from '@expo/vector-icons';

export default class ClassModalAddSubRoleActivity extends Component {
    static contextType = MySubRoleActivityContext;
    constructor(props) {
        super(props);

        this.state = {
            noFormatData: [],
            data: [],
            selectedSubRoleActivities: [],
            nav: props.navigation,
        }
    }

    componentDidMount() {
        this.setState({ noFormatData: this.context.subRoleActivitiesToSet })
        let Temp = this.context.subRoleActivitiesToSet
        let FormData = []
        for (let i = 0; i < Temp.length; i++) {
            FormData.push({
                id: Temp[i].idActivity,
                key: Temp[i],
                checked: false
            })
        }
        this.setState({ data: FormData })
    }

    onSubmitSubRoleActivities = async () => {
        var keys = this.state.data.map(t => t.key.idActivity)
        var checks = this.state.data.map(t => t.checked)
        let Selected = []
        for (let i = 0; i < checks.length; i++) {
            if (checks[i]) {
                Selected.push(keys[i])
            }
        }
        const { AddSubRoleActivity } = this.context;
        const dataToSend = {}
        dataToSend.idSubRole = global.idSubRole
        dataToSend.idActivities = Selected.toString()
        const response = await AddSubRoleActivity(dataToSend)
        if (response.data.error) {
            alert("Debe seleccionar al menos una actividad")
        } else {
            const navigation = this.state.nav
            navigation.goBack()
        }
    }

    onCancel() {
        const navigation = this.state.nav
        navigation.goBack()
    }

    onChecked(idActivity) {
        const data = this.state.data
        const index = data.findIndex(x => x.id === idActivity)
        data[index].checked = !data[index].checked
        this.setState(data)
    }

    renderActivitiesToSet() {
        return (this.state.data.length > 0) ? (this.state.data.map((item, key) => {
            return (
                <TouchableOpacity style={[tw`flex-row border-b border-gray-400 p-2 items-center`]} key={key} onPress={() => this.onChecked(item.key.idActivity)}>
                    
                    <Text style={tw`content-center text-gray-600 w-90% uppercase`}>{item.key.nameActivity}</Text>
                    <Checkbox
                        style={tw`m-1 w-5 h-5`}
                        value={item.checked}
                        onValueChange={() => this.onChecked(item.key.idActivity)}
                    />
                </TouchableOpacity>
            )
        })) : (<Text style={tw`text-center text-gray-500 my-5`}>
            No se encontraron registros
        </Text>)
    }

    render() {
        return (
            <SafeAreaProvider>
                <SafeAreaView style={[tw`flex-1 items-center`]}>
                    <SubHeader title={"Seleccione actividades a asignar"} />
                    <View style={[tw`h-full w-full items-center pt-2`, { backgroundColor: "rgba(32, 84, 0, 0.1)" }]}>
                        <Text style={tw`text-center font-bold uppercase text-2xl`}>Actividades</Text>
                        <View style={[tw`h-68% w-90% mt-2 rounded-2xl`, styles.container, { backgroundColor: "rgba(32, 84, 0, 0.12)" }]}>
                            <ScrollView>
                                {this.renderActivitiesToSet()}
                            </ScrollView>
                        </View>
                        <View style={tw`m-3 w-83%`}>
                            <View style={tw`mb-3 w-full`}>
                                <ButtonCard text={"Asignar"} onPress={() => this.onSubmitSubRoleActivities()} color={"rgba(34, 197, 94, 1)"} icon={<MaterialIcons name="assignment-ind" size={20} color="white" />} />
                            </View>
                            <ButtonCard text={"Cancelar"} onPress={() => this.onCancel()} color={"rgba(239, 68, 68, 1)"} icon={<Ionicons name="ios-arrow-back-circle-outline" size={20} color="white" />} />
                        </View>
                    </View>

                </SafeAreaView>
            </SafeAreaProvider>
        )
    }
}