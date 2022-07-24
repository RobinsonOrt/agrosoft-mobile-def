import { View, Text, StyleSheet, Image } from "react-native";
import tw from "twrnc";
import { FontAwesome5, Entypo, AntDesign } from '@expo/vector-icons';


export const ContactCard = ({name, email, phoneNumber}) => {
    return(
        <View style={[tw`p-4 h-230px mx-2 w-90% mb-5 rounded-xl shadow-2xl`, styles.safeArea ]}>
            <Text style={tw`text-center grow text-black text-17px font-bold uppercase`}>{name}</Text>
            <Text style={tw`grow text-black text-16px font-bold mt-2`}>Correo:</Text>
            <Text style={tw`grow text-black text-15px`}>{email}</Text>
            <Text style={tw`grow text-black text-16px font-bold mt-2`}>Numero de telefono:</Text>
            <Text style={tw`grow text-black text-15px`}>{phoneNumber}</Text>
            <Text style={tw`grow text-black text-16px font-bold mt-2`}>Redes Sociales:</Text>
            <View style={tw`flex-row justify-between mt-2 w-70%`}>
                <FontAwesome5 name="facebook" size={24} color="gray" />
                <AntDesign name="instagram" size={27} color="gray" />
                <AntDesign name="twitter" size={27} color="gray" />
                <Entypo name="youtube" size={27} color="gray" />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'rgba(167,167,159, 1)',
    },
    title: {
      fontSize: 20,

    },
    description: {
        fontSize: 14,
        
      },
    safeArea: {
        backgroundColor: 'rgba(187,201,178,255)',
    },
});
