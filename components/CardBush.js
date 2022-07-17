import { View, Text, StyleSheet } from "react-native";
import tw from "twrnc";

export const CardBush = ({qrCode, id, date, children}) => {
    return (
        <View style={[tw`h-210px mx-5 mb-5 w-45%  rounded-b-xl shadow-xl`, styles.safeArea]}>
            <View style={[tw`content-center h-35% px-5`, styles.container ]}>
                <Text style={[tw`text-center h-50% content-center  pt-5 uppercase font-bold`, styles.title]}>{qrCode}</Text>
            </View>
            <View style={tw`p-3 pr-1`}>
            <Text style={[tw`text-center mb-3 pr-2`, styles.description]}>id: {id}</Text>
            <Text style={[tw`text-center mb-3 pr-2`, styles.description]}>{date.split('T')[0]}</Text>
            <View style={tw`flex-row`}>{children}</View>
            </View>
        </View>
    )

}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'rgba(120, 113, 108, 0.5)',
    },
    title: {
      fontSize: 20,

    },
    description: {
        fontSize: 14,
        
      },
    safeArea: {
        backgroundColor: 'rgba(32, 84, 0, 0.1)',
        
    },
  });