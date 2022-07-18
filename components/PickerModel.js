
import React from "react";
import {
  StyleSheet, 
  Image,
  View,
} from "react-native";
import tw from "twrnc";
import RNPickerSelect from "react-native-picker-select";
import dropDownOpen from '../assets/dropDownOpen.png';               
                    
                    
const PickerModel = ({list, label, value, text, setSelected, selected})=>{   
    console.log(list)
    return(
               <View style={tw`w-full`}>
               <RNPickerSelect
                      value={selected}
                      placeholder={{ label: text, value: "" }}
                      onValueChange={(itemValue) =>
                        {setSelected(itemValue)
                        console.log(itemValue)}}
                      style={customPickerStyles}
                      useNativeAndroidPickerStyle={false}
                      Icon={() => {
                        return (
                          <Image source={dropDownOpen} style={tw`h-8px w-12px mt-5 mr-3`}/>
                        );
                      }}
                      items={   
                        Array.isArray(list)?
                        list.map((item, index) => {
                          return  {label:item[label], value:item[value], key:index}
                        }) : {label:"", value:"", key:""}
                      }
                  />
                  </View>

    )
                }
export default PickerModel

                  const customPickerStyles = StyleSheet.create({
                    inputIOS: {
                      fontSize: 14,
                      paddingVertical: 10,
                      paddingHorizontal: 12,
                      borderWidth: 1,
                      borderColor: 'green',
                      borderRadius: 8,
                      color: 'black',
                      paddingRight: 30, 
                      width: 321,// to ensure the text is never behind the icon
                      marginBottom: 20
                    },
                    inputAndroid: {
                      fontSize: 14,
                      paddingHorizontal: 10,
                      paddingVertical: 8,
                      borderWidth: 1,
                      borderColor: '#78D43F',
                      borderRadius: 8,
                      color: 'black',
                      backgroundColor: 'white',
                      paddingRight: 30,
                      width: "100%",
                      marginBottom: 20
                     // to ensure the text is never behind the icon
                    },
                    inputWeb:{
                      fontSize: 14,
                      paddingHorizontal: 10,
                      paddingVertical: 8,
                      borderWidth: 1,
                      borderColor: '#78D43F',
                      borderRadius: 8,
                      color: 'black',
                      backgroundColor: 'white',
                      paddingRight: 30,
                      marginBottom: 20
                    }
                  });
                  