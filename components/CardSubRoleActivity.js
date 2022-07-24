import { View, Text, StyleSheet } from "react-native";
import tw from "twrnc";

export const CardSubRoleActivity = ({ name, description, children }) => {
    const styles = StyleSheet.create({
        container: {
          backgroundColor: "white",
        },
        title: {
          fontSize: 20,
        },
        description: {
          fontSize: 14,
        },
        safeArea: {
          backgroundColor: "rgba(32, 84, 0, 0.1)",
        },
    });
    return(
        <View style={[tw`m-3 p-3 rounded-xl max-w-239 flex-row`, styles.safeArea]}>
            <View style={tw`w-80%`}>
                <Text style={[tw`uppercase font-bold`]}>{name}</Text>
                <Text style={[tw`mt-2`]}>Descripcion:</Text>
                <Text style={[tw``]}>{description}</Text>
            </View>
            <View style={tw`w-20% items-center justify-center`}>
                {children}
            </View>
        </View>
    )
}