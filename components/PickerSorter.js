import React,{useState} from 'react'
import tw from 'twrnc'
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native'
import RNPickerSelect from "react-native-picker-select";
import { EvilIcons } from '@expo/vector-icons';

const PickerSorter = ({ list, key1, key2, newList }) => {
    
    const {statePicker, setStatePicker} = useState(false);
    
    const sortList = (key, list, inverse) =>
        inverse
        ? [...list].sort((b, a) => (a[key].toUpperCase() > b[key].toUpperCase() ? 1 : a[key].toUpperCase() < b[key].toUpperCase() ? -1 : 0))
        : [...list].sort((a, b) => (a[key].toUpperCase() > b[key].toUpperCase() ? 1 : a[key].toUpperCase() < b[key].toUpperCase() ? -1 : 0))

    return (
        <View style={tw`w-140px rounded-md`}>
            <RNPickerSelect 
                      placeholder={{ label: "Ordenar por:", value: "" }}
                      onValueChange={(itemValue) => {
                        if(itemValue === '0' ){
                            newList(sortList(key1, list))
                        }else if(itemValue === '1' ){
                            newList(sortList(key1, list, true))

                        }else if(itemValue === '2' ){
                            newList(sortList(key2, list, true))
                            
                        }else if(itemValue === '3' ){
                            newList(sortList(key2, list))
                        }
                      }
                      }
                      style={customPickerStyles}
                      useNativeAndroidPickerStyle={false}
                      Icon={() => {
                        return (
                          <View style={tw`mt-1`}><EvilIcons name="chevron-down" size={27} color="gray" /></View>
                        );
                      }}
                      items={   
                        [
                            { label: 'A-Z', value: '0' },
                            { label: 'Z-A', value: '1' },
                            { label: 'Recientes', value: '2' },
                            { label: 'Antiguos', value: '3' }
                        ]
                      }
                />
        </View>
    )
    
}

export default PickerSorter

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
  