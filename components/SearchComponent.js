import React, {useState} from 'react'
import tw from 'twrnc'
import { TextInput, Text, Image, View, StyleSheet, TouchableOpacity } from 'react-native'
import { AntDesign } from '@expo/vector-icons'; 
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';


const SearchComponent = ({GetElements, GetOriginalElements, secondParameter, thirdParameter}) => {

  const [text , setText] = useState("");

    const searchFilterFunction = () =>{
      console.log(secondParameter)
      if(text.length > 0){
        console.log(text)
        GetElements(text, secondParameter, thirdParameter)

      }
    }
    
    const styles = StyleSheet.create({
        colorButton: {     
          borderWidth: 1,
          borderColor: 'rgba(229, 231, 235, 1)', 
          color: 'rgba(156, 163, 175, 1)',
          fontSize: 14,   
        },
      });

    return (
        <View style={tw`shadow-2xl rounded-md`}>
            <TextInput  
            value={text}
            onChangeText={(textLocal) => {setText(textLocal)}}
            placeholder="Buscar por nombre..."
            style={[tw`bg-white flex-row  items-center h-30px w-180px rounded-md px-2`, styles.colorButton]}/>
            <TouchableOpacity style={[tw`justify-between bg-green-600 items-center flex-row h-24px px-1 pr-1 rounded-7px`, styles.colorButton]} onPress={()=>searchFilterFunction()}  activeOpacity={0.6}>
                <Text style={tw`text-center text-white grow uppercase text-12px`}>Buscar</Text>
                <AntDesign name="search1" size={24} color="black" />
            </TouchableOpacity>
            <TouchableOpacity style={[tw`justify-between bg-red-600 items-center flex-row h-24px px-1 pr-1 rounded-7px`, styles.colorButton]} onPress={()=>{GetOriginalElements(secondParameter,thirdParameter); setText("")}}  activeOpacity={0.6}>
                <Text style={tw`text-center text-white grow uppercase text-12px`}>Limpiar</Text>
                <MaterialIcons name="cleaning-services" size={24} color="black" />
            </TouchableOpacity>
        </View>
        
    )
}

export default SearchComponent