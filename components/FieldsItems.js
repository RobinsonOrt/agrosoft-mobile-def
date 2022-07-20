import React from 'react';
import {
    View,
    StyleSheet,
    Text,
    TouchableOpacity,
} from "react-native";
import tw from "twrnc";

const FieldsItems = ({ tittle, value, onPress, color, text, icon }) => {
    const styles = StyleSheet.create({
        colorButton: {
            backgroundColor: color,
        },
    });
    return (
        <View style={[tw`items-center flex-row w-full h-45px border rounded-7px px-2 mt-2`, { backgroundColor: "rgba(187,201,178,1)", borderColor: "rgba(156, 163, 175, 1)" }]}>
            <View style={tw`flex-row`}>
                <Text style={tw`text-12px font-bold text-center uppercase mr-2`}>{tittle}</Text>
                <Text style={tw`text-12px mr-2`}>{value}</Text>
            </View>
            <View style={tw`flex-1 items-end`}>
                <TouchableOpacity
                    style={[tw`justify-center p-2 flex-row rounded-xl w-33`, styles.colorButton]}
                    onPress={onPress}
                    activeOpacity={0.6}
                >
                    <Text style={tw`text-center font-bold uppercase text-white mr-2`}>{text}</Text>
                    {icon}
                </TouchableOpacity>
            </View>
        </View>
    );
}

export default FieldsItems;