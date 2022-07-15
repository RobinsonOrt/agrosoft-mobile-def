
import React,{useState, useEffect} from "react";
import { View,  Text, Image, TouchableOpacity, BackHandler, ScrollView, TextInput } from "react-native";
import tw from "twrnc";
import PaginationDot from 'react-native-animated-pagination-dot';
import { Ionicons } from '@expo/vector-icons';

const PaginationFooter = ({list, setcountt, countt  }) =>{

    const [statusButton, setStatusButton] = useState(false);
    const [statusButtonn, setStatusButtonn] = useState(false);

    useEffect(()=>{
        if (Math.ceil(list.length / 2) == 1){
          setStatusButton(true)
          setStatusButtonn(true)
        }else if(countt == 0){
          setStatusButtonn(true)
          setStatusButton(false)
        }else if(countt == (Math.ceil(list.length / 2) - 1) ){
          setStatusButton(true)
          setStatusButtonn(false)
        }else
        {
          setStatusButton(false)
          setStatusButtonn(false)
        }
      },)
  
    const nextPage = () => {
        setcountt(countt+1)
        
      }
    
      const prevPage = () => {
        setcountt(countt-1)
        
      }

    return(
    <View>
    {(list.length > 0) ? (<View style={tw`flex-row items-center justify-center`}>
    <TouchableOpacity
      onPress={() => {prevPage()}}
      disabled={statusButtonn}
    >{statusButtonn ? <Ionicons name="md-arrow-back-circle-outline" size={45} color="rgba(81, 212, 0, 0.38)" /> : <Ionicons name="md-arrow-back-circle-sharp" size={50} color="rgba(81, 212, 0, 0.38)" />}
      
    </TouchableOpacity>
      <PaginationDot activeDotColor={'black'}
        curPage={countt}
        maxPage={Math.ceil(list.length / 2)}
        />
      <TouchableOpacity
      onPress={() => {nextPage()}}
      disabled={statusButton}
    >
     
      {statusButton ? <Ionicons name="md-arrow-forward-circle-outline" size={45} color="rgba(81, 212, 0, 0.38)" /> : <Ionicons name="md-arrow-forward-circle-sharp" size={50} color="rgba(81, 212, 0, 0.38)" />}
    </TouchableOpacity>  
  </View>) : null}
  </View>
  );

}

export default PaginationFooter

