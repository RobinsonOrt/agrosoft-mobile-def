import React from "react";
import { View, Text, StyleSheet } from "react-native";
import tw from "twrnc";

const SubHeader3 = ({title}) => {
    
    const styles = StyleSheet.create({
        backgroundView: {     
          backgroundColor: "rgba(81, 212, 0, 0.38)"      
        },
        textColor: {
            color: "#FFFFFF"
        }
      });

    return(
        <View style={tw`w-full items-center flex-row justify-center`}>
        <View style={[tw`h-36px w-40% flex-row items-center  content-between`, styles.backgroundView]}>
            <Text style={[tw`text-center text-14px grow text-xl font-bold uppercase`, styles.textColor]}>{title}</Text>
        </View>
        </View>
    )
}

export default SubHeader3;