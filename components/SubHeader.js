import React from "react";
import { View, Text, StyleSheet } from "react-native";
import tw from "twrnc";

const SubHeader = ({title}) => {
    
    const styles = StyleSheet.create({
        backgroundView: {     
          backgroundColor: "rgba(81, 212, 0, 0.38)"      
        },
        textColor: {
            color: "#FFFFFF"
        }
      });

    return(
        <View style={[tw`h-52px w-full flex-row items-center  content-between`, styles.backgroundView]}>
            <Text style={[tw`text-center grow text-xl font-bold uppercase`, styles.textColor]}>{title}</Text>
        </View>
    )
}

export default SubHeader;
