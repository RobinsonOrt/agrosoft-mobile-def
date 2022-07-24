import React,{useState} from 'react'
import tw from 'twrnc'
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native'
import RNPickerSelect from "react-native-picker-select";
import { EvilIcons } from '@expo/vector-icons';

const SorterComponent = ({ sorters, sorter, GetElements, firstParameter, secondParameter, thirdParameter }) => {
  var itemsToShow = [];

  if(sorter == "created_date"){
    itemsToShow = [
      { label: 'Recientes', value: '2' },
      { label: 'Antiguos', value: '3' }
    ]
  }else if(sorter == "name"){
    itemsToShow = [
      { label: 'A-Z', value: '0' },
      { label: 'Z-A', value: '1' }
  ]
  }else{
    itemsToShow = [
      { label: 'A-Z', value: '0' },
      { label: 'Z-A', value: '1' },
      { label: 'Recientes', value: '2' },
      { label: 'Antiguos', value: '3' }
  ]
  }

    return (
        <View style={tw`w-140px rounded-md shadow-2xl`}>
            <RNPickerSelect 
                      placeholder={{ label: "Ordenar por:", value: "" }}
                      onValueChange={(itemValue) => {
                        if(itemValue === '0' ){
                            sorters.sorter = sorter;
                            sorters.order = 'asc';
                            sorters.page = 0;
                            GetElements(firstParameter, secondParameter, thirdParameter)
                        }else if(itemValue === '1' ){
                            sorters.sorter = sorter;
                            sorters.order = 'desc';
                            sorters.page = 0;
                            GetElements(firstParameter, secondParameter, thirdParameter)
                        }else if(itemValue === '2' ){
                            sorters.sorter = (sorter == "name_sub_role") ? "created_sub_role" : "created_date";
                            sorters.order = 'desc';
                            sorters.page = 0;
                            GetElements(firstParameter, secondParameter, thirdParameter)
                        }else if(itemValue === '3' ){
                            sorters.sorter = (sorter == "name_sub_role") ? "created_sub_role" : "created_date";
                            sorters.order = 'asc';
                            sorters.page = 0;
                            GetElements(firstParameter, secondParameter, thirdParameter)
                        }
                        console.log(itemValue)
                      }
                        }
                      style={customPickerStyles}
                      useNativeAndroidPickerStyle={false}
                      Icon={() => {
                        return (
                          <View style={tw`mt-1`}><EvilIcons name="chevron-down" size={27} color="gray" /></View>
                        );
                      }}
                      
                      items={itemsToShow}
                />
        </View>
    )
    
}

export default SorterComponent

const customPickerStyles = StyleSheet.create({
    inputIOS: {
        fontSize: 16,
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderWidth: 1,
        borderColor: 'rgba(229, 231, 235, 1)',
        borderRadius: 7,
        color: 'rgba(156, 163, 175, 1)',
        backgroundColor: 'white',
        paddingRight: 30,
        width: 140,
        height: 30,
    },
    inputAndroid: {
      fontSize: 14,
      paddingHorizontal: 10,
      paddingVertical: 6,
      borderWidth: 1,
      borderColor: 'rgba(229, 231, 235, 1)',
      borderRadius: 7,
      color: 'rgba(156, 163, 175, 1)',
      backgroundColor: 'white',
      paddingRight: 30,
      width: 140,
      height: 30,
      
     // to ensure the text is never behind the icon
    },
    inputWeb:{
        fontSize: 16,
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderWidth: 1,
        borderColor: 'rgba(229, 231, 235, 1)',
        borderRadius: 9,
        color: 'rgba(156, 163, 175, 1)',
        backgroundColor: 'white',
        paddingRight: 30,
        width: 140,
        height: 30,
    }
  });
  