import {
    View,
    Text,
    StyleSheet
} from "react-native";
import React from "react";
import tw from "twrnc";

export const AccordionAssignedCrops = ({ name, text, value, hei, children }) => {
    const styles = StyleSheet.create({
        openAccordion: {
            backgroundColor: "rgba(189,202,180,255)",
            borderBottomWidth: 1,
            borderBottomColor: "rgba(130, 130, 130, 1)",
            margin: 0,
            borderTopLeftRadius: 16,
            borderTopRightRadius: 16,
        },
        text: {
            fontSize: 18,
            marginBottom: 20,
        },
        list: {
            overflow: 'hidden',
            height: hei,
            backgroundColor: "rgba(214,222,210,1)",
            borderBottomLeftRadius: 16,
            borderBottomRightRadius: 16,
            marginBottom: 10,
        }
    });

    return (
        <>
            <View style={[tw`h-50px items-center flex-row justify-between`, styles.openAccordion]}>
                <Text style={tw`grow mr-2 uppercase text-center text-20px`}>{name}</Text>
            </View>
            <View style={[styles.list, tw`p-13px`]}>
                <Text style={tw`grow uppercase font-bold text-center text-18px`}>{text}</Text>
                <Text style={tw`grow text-center text-15px`}>{value}</Text>
                <View style={tw` items-center justify-center px-3 py-4`}>
                    {children}
                </View>
            </View>
        </>
    )
}
