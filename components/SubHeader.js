import React from "react";
import { View, Text, StyleSheet } from "react-native";
import tw from "twrnc";

const SubHeader = ({title}) => {
    
    const styles = StyleSheet.create({
        backgroundView: {     
          backgroundColor: "rgba(81, 212, 0, 0.2)"      
        },
        textColor: {
<<<<<<< HEAD
            color: "rgba(13, 158, 8, 0.5)"
=======
            color: "rgba(52, 136, 0, 1)"
>>>>>>> cultivosRobinson
        }
      });

    return(
        <View style={[tw`h-57px w-full flex-row items-center  content-between`, styles.backgroundView]}>
            <Text style={[tw`text-center grow text-xl font-bold uppercase`, styles.textColor]}>{title}</Text>
        </View>
    )
}

export default SubHeader;
