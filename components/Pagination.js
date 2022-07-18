import React,{useState, useEffect} from "react";
import { View,  Text, Image, TouchableOpacity, BackHandler, ScrollView, TextInput } from "react-native";
import tw from "twrnc";
import PaginationDot from 'react-native-animated-pagination-dot';
import { Ionicons } from '@expo/vector-icons';

const PaginationFooter = ({maxPage, sorters, GetElements, firstParameter, secondParameter, thirdParameter  }) =>{

    const [statusButton, setStatusButton] = useState(false);
    const [statusButtonn, setStatusButtonn] = useState(false);

    useEffect(()=>{
        if (maxPage == 0){
          setStatusButton(true)
          setStatusButtonn(true)
        }else if(sorters.page == 0){
          setStatusButtonn(true)
          setStatusButton(false)
        }else if(sorters.page == maxPage){
          setStatusButton(true)
          setStatusButtonn(false)
        }else
        {
          setStatusButton(false)
          setStatusButtonn(false)
        }
      },)
  
    const nextPage = () => {
        sorters.page++;
        GetElements(firstParameter, secondParameter, thirdParameter)
      }
    
      const prevPage = () => {
        sorters.page--;
        GetElements(firstParameter, secondParameter, thirdParameter)
      }

    return(
    <View>
    {(maxPage > 0) ? (<View style={tw`flex-row items-center justify-center`}>
    <TouchableOpacity
      onPress={() => {prevPage()}}
      disabled={statusButtonn}
    >{statusButtonn ? <Ionicons name="md-arrow-back-circle-outline" size={45} color="rgba(81, 212, 0, 0.38)" /> : <Ionicons name="md-arrow-back-circle-sharp" size={50} color="rgba(81, 212, 0, 0.38)" />}
      
    </TouchableOpacity>
      <PaginationDot activeDotColor={'black'}
        curPage={sorters.page}
        maxPage={maxPage + 1}
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